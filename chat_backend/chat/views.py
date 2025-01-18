# chat_backend/chat/views.py
from django.http import JsonResponse
from .firebase import save_message
from .firebase import get_opened_chat_message
from .firebase import users_login
from .firebase import users_signup
from .firebase import get_fiendsList
from rest_framework.views import APIView  # Add this import statement
from rest_framework.response import Response

class GetMessageFromUser(APIView):
    def post(self, request, *args, **kwargs):

        # if 'sender' not in request.data :
        #     return Response({"error": "Missing 'sender'"}, status=400)
        try:
            result = save_message(request.data)
            if result["success"]:
                return JsonResponse({"message": result["message"]}, status=200)
            else:
                return JsonResponse({"error": result["error"]}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

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
                # print({"Found": "true", "user_id": result["user_id"]})
                return Response({"Found": "true", "user_id": result["user_id"]}, status=200)
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
        print("Request data:", request.data)

        if 'sender' not in request.data :
            return Response({"error": "Missing 'sender' "}, status=400)

        try:
            result = get_fiendsList(request.data)
            return JsonResponse(result, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)



# class getFriendsListForNativeApp(APIView):
#     def post(self, request):
#         print("Request data:", request.data)

#         if 'sender' not in request.data :
#             return Response({"error": "Missing 'sender' "}, status=400)

#         try:
#             result = get_fiendsList(request.data)
#             return JsonResponse(result, status=200)
#         except Exception as e:
#             return Response({"error": str(e)}, status=500)
