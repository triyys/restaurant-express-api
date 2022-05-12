# **Mô tả**

App backend Node.js cung cấp RESTful API cho ứng dụng quản lý sự kiện. <br>
Nhiệm vụ của team frontend là sử dụng các API được cung cấp xây dựng ứng dụng phía người dùng.
<br>
<br>

# **Cài đặt**

Để chạy ứng dụng backend, cần cài đặt môi trường [Node.js và npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) và [Mongodb Community](https://www.mongodb.com/try/download/community).
Sau khi cài đặt xong Node.js và npm, gõ lệnh:

```console
npm install
```

Tạo schema có tên là `pos_system`, chỉnh sửa nội dung file *app/config/db.config.js* như sau:
```javascript
// User là tài khoản Database Access trên Mongodb Cloud,
module.exports = {
    uri: `mongodb+srv://${user}:${password}@restaurantpos.mjkgg.mongodb.net/RestaurantPOS?retryWrites=true&w=majority`
}
```
Chạy ứng dụng trên [localhost](http://localhost:8080) port 8080 (có thể chỉnh sửa port trong file *server.js*):

```console
npm start
```
Lưu ý: Trước khi chạy phải thêm IP address của máy trong phần Network Access trên Mongodb Cloud
<br>

# **Cách sử dụng các API lấy dữ liệu cho frontend**

**Lưu ý**: Với các POST và PUT method, đặt tên dữ liệu đúng định dạng như trong phần _Description_

## ***Đồ ăn:***

### **API**

Method | URL | Description | Return
-----|--------|-------|----------
GET |/food? | Lấy tất cả các món ăn trong thực đơn | Một array gồm các object chứa id, tên, giá, hình ảnh của món ăn
GET |/food?type={`type`} | Lấy tất cả các món ăn trong thực đơn của một loại | Một array gồm các object chứa id, tên, giá, hình ảnh của món ăn trong một loại
GET |/food/:{`id`} | Lấy món ăn cụ thể trong thực đơn bằng string ID | Một object chứa thông tin đầy đủ của món ăn
GET |/foods | Lấy danh sách tất cả các món ăn | Một array các object thông tin món ăn. Object chứa ....

### **Parameters**

Name | | Description |
------|------|----
type | required | Số tháng từ 1 tới 12 |
id | required | ID của món ăn |

## ***Giỏ hàng***

### **API**

Method | URL | Description | Return
-----|--------|-------|----------
GET |/cart?list={`listItemIds`} | Gửi danh sách id các món ăn trong giỏ hàng | Một array gồm các object chứa đầy đủ thông tin các item trong giỏ hàng, với các tuỳ chọn liên quan.

### **Parameters**

Name | | Description |
------|------|----
list | required | Danh sách ObjectId của các món trong giỏ hàng |

### **JSON Response Data Sample**
- GET /cart?list={`listItemIds`}
```javascript
[{
    "_id": "618eb8bfc195fbd6f3d8983d",
    "name": "Cánh gà rán",
    "price": 25000,
    "discount": "0",
    "imageUrls": [
        "https://ameovat.com/wp-content/uploads/2016/05/cach-lam-ga-ran.jpg",
        "https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg"
    ],
    "options": [{
        "_id": "618eb1edc195fbd6f3cf8195",
        "name": "Độ cay",
        "isMultiSelect": false,
        "items": [{
            "name": "Cực cay",
            "price": 0
        }]
    }]
}]
```
