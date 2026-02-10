# API Curl Examples

This document contains curl examples for all available Apartment Booking System API endpoints.

## Base URL

```bash
BASE_URL="http://localhost:3000"
```

---

## 🏠 Health Check

```bash
# Health Check / API Info
curl -X GET "$BASE_URL/"
```

---

## 🔐 Auth Endpoints (`/auth`)

### Login

```bash
curl -X POST "$BASE_URL/auth/login" \
-H "Content-Type: application/json" \
-d '{
    "email": "admin@example.com",
    "password": "password123"
}'
```

### Register

```bash
curl -X POST "$BASE_URL/auth/register" \
-H "Content-Type: application/json" \
-d '{
    "nama": "New User",
    "email": "user@example.com",
    "password": "password123",
    "role": "user"
}'
```

### Get Profile

```bash
curl -X GET "$BASE_URL/auth/profile" \
-H "Authorization: Bearer YOUR_TOKEN"
```

---

## 👥 User Endpoints (`/users`)

### Get All Users (Admin)

```bash
curl -X GET "$BASE_URL/users" \
-H "Authorization: Bearer YOUR_TOKEN"
```

### Get User by ID (Admin)

```bash
curl -X GET "$BASE_URL/users/1" \
-H "Authorization: Bearer YOUR_TOKEN"
```

### Create User (Admin)

```bash
curl -X POST "$BASE_URL/users" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN" \
-d '{
    "nama": "New Admin",
    "email": "newadmin@example.com",
    "password": "securepassword",
    "role": "admin"
}'
```

### Update User (Admin)

```bash
curl -X PUT "$BASE_URL/users/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN" \
-d '{
    "nama": "Updated Name",
    "email": "updated@example.com"
}'
```

### Delete User (Admin)

```bash
curl -X DELETE "$BASE_URL/users/1" \
-H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📦 Room Endpoints (`/rooms`)

### Get All Rooms (Public)

```bash
curl -X GET "$BASE_URL/rooms"
```

### Get Room by ID (Public)

```bash
curl -X GET "$BASE_URL/rooms/1"
```

### Create Room (Admin/Coordinator)

```bash
curl -X POST "$BASE_URL/rooms" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN" \
-d '{
    "type_name": "Deluxe Ocean View",
    "description": "Double bed with ocean view, AC included",
    "price_per_night": 500000,
    "bed_type": "double",
    "has_ac": true,
    "has_fan": true,
    "total_rooms": 5,
    "image_url": "http://example.com/room.jpg"
}'
```

### Update Room (Admin/Coordinator)

```bash
curl -X PUT "$BASE_URL/rooms/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN" \
-d '{
    "price_per_night": 600000,
    "total_rooms": 10
}'
```

### Delete Room (Admin/Coordinator)

```bash
curl -X DELETE "$BASE_URL/rooms/1" \
-H "Authorization: Bearer YOUR_TOKEN"
```

---

## � Booking Endpoints (`/bookings`)

### Get All Bookings

```bash
curl -X GET "$BASE_URL/bookings" \
-H "Authorization: Bearer YOUR_TOKEN"
```

### Create Booking

```bash
# User sets how many rooms and date range
curl -X POST "$BASE_URL/bookings" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN" \
-d '{
    "room_id": 1,
    "room_count": 1,
    "check_in_date": "2026-06-01",
    "check_out_date": "2026-06-05",
    "notes": "Honeymoon"
}'
```

### Approve Booking (Admin/Coordinator)

```bash
# Confirms booking and deducts room availability
curl -X POST "$BASE_URL/bookings/1/approve" \
-H "Authorization: Bearer YOUR_TOKEN"
```

### Reject Booking (Admin/Coordinator)

```bash
curl -X POST "$BASE_URL/bookings/1/reject" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN" \
-d '{
    "notes": "Sorry, maintenance issue."
}'
```

### Check In (Admin/Coordinator)

```bash
curl -X POST "$BASE_URL/bookings/1/check-in" \
-H "Authorization: Bearer YOUR_TOKEN"
```

### Check Out (Admin/Coordinator)

```bash
# Returns room to inventory
curl -X POST "$BASE_URL/bookings/1/check-out" \
-H "Authorization: Bearer YOUR_TOKEN"
```
