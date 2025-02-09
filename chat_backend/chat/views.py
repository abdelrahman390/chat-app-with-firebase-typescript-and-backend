# chat_backend/chat/views.py
from django.http import JsonResponse
from .firebase import save_message
from .firebase import get_opened_chat_message
from .firebase import users_login
from .firebase import users_signup
from .firebase import get_fiendsList
from .firebase import generateToken
from rest_framework.views import APIView  # Add this import statement
from rest_framework.response import Response
from django.middleware.csrf import get_token
from django.http import HttpResponse
import logging
from datetime import datetime, timedelta
from rest_framework.serializers import Serializer, CharField, ChoiceField

# Set up logging
logger = logging.getLogger(__name__)

class GetMessageFromUser(APIView):
    def post(self, request, *args, **kwargs):

        # logger.error(f'GetMessageFromUser: {len(auth_header)} ')
        auth_header = request.headers.get('Authorization')
        user_data = request.data.get("user", {})
        if not auth_header or not auth_header.startswith('Bearer ') or len(auth_header) != 39 or 'userId' not in user_data:
            return Response({"error": "User-id or Authorization token is missing or invalid."}, status=401)
        
        message_data = request.data.get("message", {})
        if 'sender' not in message_data or 'receiver' not in message_data or 'msg' not in message_data or 'date' not in message_data or 'chatId' not in message_data:
            return Response({"error": "Missing required message data fields."}, status=400)

        try:
            result = save_message(request.data, auth_header[len('Bearer '):])
            if result["success"]:
                return JsonResponse({"message": result["message"]}, status=200)
            elif result["error"] == 'unauthorized': 
                return JsonResponse(result["error"], safe=False, status=401)
            else:
                return JsonResponse({"error": result["error"], 'test': "hallo"}, status=400)
        except Exception as e:
            return Response({"error": str(e), "test": result }, status=500)

# backend validation Done
class OpenedChatMessages(APIView):
    logger.error('START ############################')
    def get(self, request):
        userId = request.GET.get('userId')
        chatId = request.GET.get('chatId')
        auth_header = request.headers.get('Authorization')
        # logger.error(f'auth_token: {auth_header} len: {len(auth_header)} user-id {userId} chat id {chatId}')

        if not userId or not chatId or not auth_header or len(auth_header) != 32 :
            return Response({"error": "Missing 'userId', 'chatId', or invalid 'Authorization' token."}, status=400)
        
        try:
            # get_opened_chat_message(request.data)
            result = get_opened_chat_message(userId, chatId, auth_header)
            if result["success"]:
                logger.error('END ############################')
                return JsonResponse({"chat": result["message"]}, status=200)
            else:
                logger.error(f'error: {result.get("error", "Unknown error")}')
                return JsonResponse({"error": result.get("error", "Unknown error")}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

# backend validation Done
class UsersLogin(APIView):
    def post(self, request):
        class LoginSerializer(Serializer):
            user_name = CharField(min_length=3, required=True)
            password = CharField(min_length=1, required=True)

        # Ensure that coming data from front-end is valid
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"error": serializer.errors}, status=400)

        try:
            result = users_login(request.data)
            if result["success"]:
                response = Response({"Found": "true", "userId": result["user_id"], "token": result["token"]}, status=200)
                response.set_cookie(
                    key="auth_token",
                    value="test_token",
                    httponly=True,        # Prevents JavaScript access
                    secure=False,         # Set to True in production
                    samesite="None"
                )
                return response
                # return Response({"Found": "true", "userId": result["user_id"], "token": result["token"]}, status=200)
            else:
                # print("error")
                return Response({"Found": "false"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

# backend validation Done
class Signup(APIView):
    def post(self, request):
        class LoginSerializer(Serializer):
            user_name = CharField(min_length=3, required=True)
            password = CharField(min_length=1, required=True)
            gender = ChoiceField(choices=["male", "Male", "female", "Female"], required=True)
            
        # Ensure that coming data from front-end is valid
        serializer = LoginSerializer(data=request.data)
        # logger.error(f'{request.data} - {not len(request.data["user_name"]) >= 2} - {not len(request.data["password"]) >= 3}')
        if not serializer.is_valid():
            return Response({"error": serializer.errors}, status=400)

        try:
            result = users_signup(request.data)
            if result["response"] == "done":
                return Response(result, status=200)
            else:
                return Response(result, status=400)
            # return JsonResponse(result, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

# backend validation Done
class getFriendsList(APIView):
    def get(self, request):
        user_id = request.GET.get('userId')
        auth_header = request.headers.get('Authorization')
        # logger.error(f'auth_token: {auth_header} user id {user_id}')

        if not user_id or not auth_header or len(auth_header) != 32:
            # logger.error("$$$$$$ Missing 'userId' or 'token'")
            return Response({"error": "Missing 'userId', 'chatId', or invalid 'Authorization' token."}, status=400)

        try:
            result = get_fiendsList(user_id, auth_header)
            return JsonResponse(result, status=200)

            # return JsonResponse(request.data, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

