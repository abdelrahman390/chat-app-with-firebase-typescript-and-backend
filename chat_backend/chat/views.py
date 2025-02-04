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

# Set up logging
logger = logging.getLogger(__name__)

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
            if result["success"]:
                # print("result tets", request.data["Platform"], "web" == request.data["Platform"])
                if "web" == request.data["Platform"]:
                    logger.error(f"auth_token {result["token"]}" ) # this log correct token
                    response = Response({"Found": "true", "userId": result["user_id"]}, status=200)
                    # response.set_cookie(
                    #     key="auth_token",
                    #     value = f"{result["token"]}",
                    #     httponly=False,  # Make it False temporarily to access via JS for debugging
                    #     secure=False,    # False for local dev
                    #     samesite="Strict"
                    # )
                    # Set cookie properly (pass a string value, not a set)
                    response.set_cookie(
                        'auth_token',
                        result['token'],  # token should be a string
                        httponly=True,  # For security, make it httponly
                        secure=False,   # Set to True for HTTPS, False for local dev
                        samesite="none"  # Use "None" for cross-origin
                    )

                    # Log the response headers to ensure cookie is being set
                    logger.error(f"Response headers: {response.headers}") # didn`t log cookie
                    logger.error(f"Response items: {response.items()}")  # Log the full response headers
                    return response
                else :
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

        auth_token = request.COOKIES.get("csrftoken")  # Extract token from cookies
        logger.error(f'auth_token: {auth_token}')

        # if not auth_token:
        #     return JsonResponse({"error": "Unauthorized"}, status=401)
        
        if 'userId' not in request.data or 'token' not in request.data :
            logger.error("$$$$$$ Missing 'userId' or 'token'" )
            return Response({"error": "Missing 'userId' or 'token'"}, status=400)

        # print("auth_token", auth_token)
        try:
            # result = get_fiendsList(request.data)
            # return JsonResponse(result, status=200)

            return JsonResponse(request.data, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


# class TestLoginView(APIView):
#     def post(self, request):
#         response = HttpResponse("Cookie Set!")
#         response.set_cookie(
#             key="auth_token",
#             value="test_token",  # You should pass a real token here
#             secure=False,         # Set to False for local development
#             samesite='none',      # Required for cross-origin requests
#             httponly=False,        # Optional for security
#             expires=2000   
#         )

#         logger.error(f"Response headers: {response.headers}") # didn`t log cookie
#         logger.error(f"Response items: {response.items()}")  # Log the full response headers
#         return response
