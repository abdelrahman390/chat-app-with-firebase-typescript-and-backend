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


class GetMessageFromUser(APIView):
    def post(self, request, *args, **kwargs):

        # if 'userId' not in request.data["user"] or 'token' not in request.data["user"] :
        #     return Response({"error": "Missing 'userId' or 'token'"}, status=400)
        if 'userId' not in request.data.get("user", {}) or 'token' not in request.data.get("user", {}):
            return Response({"error": "Missing 'userId' or 'token'"}, status=400)
        try:
            result = save_message(request.data)
            if result["success"]:
                return JsonResponse({"message": result["message"]}, status=200)
            elif result["error"] == 'unauthorized': 
                return JsonResponse(result["error"], safe=False, status=401)
            else:
                return JsonResponse({"error": result["error"], 'test': "hallo"}, status=400)
        except Exception as e:
            return Response({"error": str(e), "test": result }, status=500)

class OpenedChatMessages(APIView):
    def post(self, request):
        if 'chat_id' not in request.data :
            print(request.data)
            return Response({"error": "Missing 'chat_id'"}, status=400)
        try:
            # get_opened_chat_message(request.data)
            result = get_opened_chat_message(request.data)
            if result["success"]:
                return JsonResponse({"chat": result["message"]}, status=200)
            else:
                return JsonResponse({"error": result["error"]}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class UsersLogin(APIView):
    def post(self, request):
        # print("Request Data from login:", request.data)  # Debugging line
        if 'user_name' not in request.data or "password" not in request.data:
            return Response({"error": "Missing 'user_name' or 'password'"}, status=400)
        try:
            result = users_login(request.data)
            # print("result tets", result)
            if result["success"]:
                return Response({"Found": "true", "userId": result["user_id"], "token": result["token"]}, status=200)
            else:
                # print("error")
                return Response({"Found": "false"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class Signup(APIView):
    def post(self, request):
        print("Request data:", request.data)

        if 'user_name' not in request.data :
            return Response({"error": "Missing 'user_name' "}, status=400)

        try:
            result = users_signup(request.data)
            print("result", result)
            # if result :
            #     return Response({"response": result}, status=200)
            # else:
            #     return Response({"response": result}, status=400)
            return JsonResponse(result, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class getFriendsList(APIView):
    def post(self, request):

        if 'userId' not in request.data or 'token' not in request.data :
            return Response({"error": "Missing 'userId' or 'token'"}, status=400)

        try:
            result = get_fiendsList(request.data)
            return JsonResponse(result, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
