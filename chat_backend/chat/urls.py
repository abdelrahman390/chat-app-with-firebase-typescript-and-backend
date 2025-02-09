# chat/urls.py
from django.urls import path
from .views import GetMessageFromUser
from .views import OpenedChatMessages
from .views import UsersLogin
from .views import Signup
from .views import getFriendsList
# from .views import TestLoginView
# from .views import test


urlpatterns = [
    path("save-message/", GetMessageFromUser.as_view(), name="save-message"),
    path("login/", UsersLogin.as_view(), name="login"),
    path("Signup/", Signup.as_view(), name="Signup"),
    path("OpenedChatMessages/", OpenedChatMessages.as_view(), name="OpenedChatMessages"),
    path("getFriendsList/", getFriendsList.as_view(), name="getFriendsList"),
    # path("test/", TestLoginView.as_view(), name="test"),
    # path("test/", test.as_view(), name="test"),
]
