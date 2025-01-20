
from django.test import TestCase, RequestFactory
from rest_framework.test import APIRequestFactory
from .views import UsersLogin

class UsersLoginTestCase(TestCase):
    def setUp(self):
        # Initialize the request factory
        self.factory = APIRequestFactory()
        self.view = UsersLogin.as_view()

    def test_successful_login(self):
        # Create a mock request with valid data
        data = {
            "user_name": "body",
            "password": "123"
        }
        request = self.factory.post("/chat/login/", data, format="json")
        
        # Call the view and get the response
        response = self.view(request)
        print("Response object:", response)
        print("Response data:", response.data)
        
        # Assert the expected response
        self.assertEqual(response.status_code, 200)
        self.assertIn("Found", response.data)

    def test_missing_fields(self):
        # Create a mock request with missing data
        data = {
            "user_name": "test_user"
        }
        request = self.factory.post("/users/login/", data, format="json")
        
        # Call the view and get the response
        response = self.view(request)
        
        # Assert the expected response
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, {"error": "Missing 'user_name' or 'password'"})

    def test_invalid_login(self):
        # Simulate `users_login` returning an unsuccessful result
        data = {
            "user_name": "invalid_user",
            "password": "wrong_password"
        }
        request = self.factory.post("/users/login/", data, format="json")
        
        # Mock the `users_login` function to return failure
        def mock_users_login(data):
            return {"success": False}
        
        with self.settings(USERS_LOGIN=mock_users_login):  # Replace users_login function
            response = self.view(request)
        
        # Assert the expected response
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {"Found": "false"})
