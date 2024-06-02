curl -X POST http://localhost:3000/send-email \
-H "Content-Type: application/json" \
-d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "message": "Hello, this is a test message."
}'
