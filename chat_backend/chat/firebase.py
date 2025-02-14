import time
from datetime import datetime
import secrets
from chat_backend.settings import *
db = firebase.database()
import logging


# Set up logging
logger = logging.getLogger(__name__)


def generateToken():
    return secrets.token_hex(16)

def CheckForCredentials(userId, givenToken):
    token = db.child("tokens").child(userId).get().val()
    if token == givenToken:
        return True
    else:
        return False


def save_message(messageData, token):
    try:
        checkResult = CheckForCredentials(messageData["user"].get("userId"), token)
        if checkResult :
            messageDataHandle = {
                'date': messageData["message"]['date'],
                'msg': messageData["message"]['msg'],
                "sender": messageData["message"]['sender'],
                "receiver": messageData["message"]['receiver']
            }
            timestamp = int(time.time() * 1000)
            db.child("chats").child(messageData["message"]['chatId']).child(timestamp).set(messageDataHandle)
            # If successful, return confirmation
            return {"success": True, "message": "Message saved successfully!"}
        else :
            return {"success": False, "error": 'unauthorized'}
    except Exception as e:
        # print(f"Error saving message: {str(e)}")
        return {"success": False, "error": str(e)}

def get_opened_chat_message(userId, chatId, token):
    try:
        checkResult = CheckForCredentials(userId, token)
        if checkResult :
            # logger.error(f'test Firebase pageS: {allUsers.keys()}')
            # check if wanted chat is belongs to user
            def checkForChatAuthority(allUsersLocal, senderId, chatId) :
                for id in allUsersLocal:
                    if id != senderId:
                        chatIdTest = int(id[-2:]) + int(senderId[-2:])
                        if int(chatIdTest) == int(chatId):
                            return True

            allUsers = db.child("users").get().val()
            if checkForChatAuthority(allUsers, userId, chatId) :
                chat_messages = db.child("chats").child(chatId).get().val()
                # If successful, return confirmation
                if chat_messages != None :
                    return {"success": True, "message": chat_messages}
                else:
                    return {"success": True, "message": {}}
            else : 
                return {"success": False, "error": 'unauthorized chat'}
        else :
            return {"success": False, "error": 'unauthorized'}
    except Exception as e:
        logger.error(f'test Error: {str(e)}')
        return {"success": False, "error": e}

def users_login(messageData):
    try:
        # Direct Firebase interaction
        userCheck = db.child('users').order_by_child('user_name').equal_to(messageData['user_name']).get()

        # Check if the user exists
        if userCheck.val() != []:
            # The data exists; check the password
            for user_id, user_data in userCheck.val().items():
                if user_data['password'] == messageData['password']:
                        token = db.child("tokens").child(user_id).get().val()
                        if token :
                            return {"success": True, "user_id": user_id, "token": token}
                        else :
                            newToken = generateToken()
                            db.child("tokens").child(user_id).set(newToken)
                            return {"success": True, "user_id": user_id, "token": newToken}
                else:
                    return {"success": False}
        else:
            print("error" , db.child("tokens").child(user_id) )
            return {"success": False}
        
    except Exception as e:
        # print(f"Error saving message: {str(e)}")
        return {"success": False, "error": str(e)}

def users_signup(messageData):
    try:
        # Direct Firebase interaction
        userCheck = db.child('users').order_by_child('user_name').equal_to(messageData['user_name']).get()

        # Check if the user exists
        if userCheck.val() != [] :
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
            newToken = generateToken()
            db.child("users").child(timestamp).set(newUser)
            db.child("tokens").child(timestamp).set(newToken)
            return {"response": "done", "userId": timestamp, "token": newToken}
    except Exception as e:
        # print(f"Error saving message: {str(e)}")
        return {"success": False, "error": str(e)}

def get_fiendsList(userId, token):
    try:
        checkResult = CheckForCredentials(userId, token)
        if checkResult :
            # Direct Firebase interaction
            userCheck = db.child('users').get().val()
            # Check if the user exists
            users = list()
            if userCheck != []:
                # get users which not equal to sender
                for user_id, user_data in userCheck.items():
                    if int(user_id) != int(userId):
                        users.append({"id": user_id, 'user_name': user_data['user_name']})
                return {"success": True, "users": users }
            else:
                return {"success": True}
        else :
            return {"success": False, "Error": 'unauthorized'}
    except Exception as e:
        # print(f"Error saving message: {str(e)}")
        return {"success": False, "error": str(e)}
