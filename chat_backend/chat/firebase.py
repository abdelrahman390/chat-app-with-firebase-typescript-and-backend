import time
from datetime import datetime
# from django.conf import settings
from chat_backend.settings import *
db = firebase.database()


# def check_firebase_connection():
#     try:
#         # Try reading a simple path to confirm connection
#         ref = db.child("chats").child("119").get()  # You can use any valid path in your database
#         result = ref.get()  # Attempt to read data
#         if result is None:
#             print("Connection successful, but no data at 'some_path'.")
#         else:
#             print("Connection successful. Data fetched:", result)
#     except Exception as e:
#         print(f"Error connecting to Firebase: {e}")
# check_firebase_connection()

def save_message(messageData):
    try:
        messageDataHandle = {
            'date': messageData['date'],
            'msg': messageData['msg'],
            "sender": messageData['sender'],
            "receiver": messageData['receiver']
        }
        messageTime = messageData['messageId']
        db.child("chats").child(messageData['chatId']).child(messageTime).set(messageDataHandle)
        # If successful, return confirmation
        # print(f"Message saved successfully from firebase: {messageData}")
        return {"success": True, "message": f"Message saved successfully!"}
    except Exception as e:
        # print(f"Error saving message: {str(e)}")
        return {"success": False, "error": str(e)}

def get_opened_chat_message(chatId):
    try:
        chat_messages = db.child("chats").child(chatId['chat_id']).get().val()
        # If successful, return confirmation
        if chat_messages != None :
            # print('chat_messages', chat_messages)
            # for user_id, user_data in chat_messages.items():
            #     print("chat_messages", user_data)
            return {"success": True, "message": chat_messages}
        else:
            return {"success": True, "message": {}}
    except Exception as e:
        return {"success": False, "error": str(e)}

def users_login(messageData):
    try:
        # Direct Firebase interaction
        userCheck = db.child('users').order_by_child('user_name').equal_to(messageData['user_name']).get()

        # Check if the user exists
        if userCheck.val() != []:
            # print("user ok")
            # The data exists; check the password
            for user_id, user_data in userCheck.val().items():
                if user_data['password'] == messageData['password']:
                    return {"success": True, "user_id": user_id}
                else:
                    return {"success": False}
        else:
            return {"success": False}
        
    except Exception as e:
        # print(f"Error saving message: {str(e)}")
        return {"success": False, "error": str(e)}

def users_signup(messageData):
    try:
        # Direct Firebase interaction
        userCheck = db.child('users').order_by_child('user_name').equal_to(messageData['user_name']).get()

        # Check if the user exists
        if userCheck.val() != []:
            return {"response": "user_name_founded"}
        else:
            now = datetime.now()
            formatted_date = now.strftime("%m/%d/%Y, %I:%M:%S %p")
            newUser = {
                'user_name': messageData["user_name"],
                'password': messageData["password"],
                'date': formatted_date
            }
            timestamp = int(time.time() * 1000)
            db.child("users").child(timestamp).set(newUser)
            return {"response": "done", "key": timestamp}
    except Exception as e:
        # print(f"Error saving message: {str(e)}")
        return {"success": False, "error": str(e)}

def get_fiendsList(messageData):
    try:
        # Direct Firebase interaction
        userCheck = db.child('users').get().val()

        # Check if the user exists
        # print(userCheck)
        # return {"success": True, "userCheck": userCheck}
        users = list()
        if userCheck != []:
            # get users which not equal to sender
            for user_id, user_data in userCheck.items():
                if user_data['user_name'] != messageData['sender']:
                    users.append({"id": user_id, 'user_name': user_data['user_name']})
            return {"success": True, "users": users}
        else:
            return {"success": True}
        
    except Exception as e:
        # print(f"Error saving message: {str(e)}")
        return {"success": False, "error": str(e)}


# def get_fiendsListForNativeApp(requiredChats):
#     try:
#         # Direct Firebase interaction
#         userCheck = db.child('users').get().val()

#         # Check if the user exists
#         # print(userCheck)
#         # return {"success": True, "userCheck": userCheck}
#         users = list()
#         if userCheck != []:
#             # get users which not equal to sender
#             for user_id, user_data in userCheck.items():
#                 if user_data['user_name'] != messageData['sender']:
#                     users.append({"id": user_id, 'user_name': user_data['user_name']})
#             return {"success": True, "users": users}
#         else:
#             return {"success": True}
        
#     except Exception as e:
#         # print(f"Error saving message: {str(e)}")
#         return {"success": False, "error": str(e)}