<?php
// --- "CƠ SỞ DỮ LIỆU" GIẢ LẬP BẰNG MẢNG PHP ---
$products = [
    ['id' => 1, 'name' => 'Laptop Dell XPS 15', 'description' => 'Laptop cao cấp, màn hình 4K, cấu hình mạnh mẽ.'],
    ['id' => 2, 'name' => 'iPhone 15 Pro Max', 'description' => 'Điện thoại thông minh hàng đầu của Apple.'],
    ['id' => 3, 'name' => 'Bàn phím cơ Logitech G Pro', 'description' => 'Bàn phím chuyên dụng cho game thủ.'],
    ['id' => 4, 'name' => 'Màn hình Dell UltraSharp 27', 'description' => 'Màn hình 27 inch, độ phân giải 2K, màu sắc chính xác.'],
    ['id' => 5, 'name' => 'Chuột không dây Logitech MX Master 3S', 'description' => 'Chuột công thái học, hiệu suất cao.'],
    ['id' => 6, 'name' => 'Tai nghe Sony WH-1000XM5', 'description' => 'Tai nghe chống ồn chủ động tốt nhất thị trường.'],
];

// Khởi tạo biến
$searchTerm = '';
$results = [];
$error = '';
$isSearchPerformed = false;

// --- LOGIC XỬ LÝ TÌM KIẾM ---
// Kiểm tra xem form đã được gửi đi và có từ khóa không
if (isset($_GET['tukhoa'])) {
    $isSearchPerformed = true;
    $searchTerm = trim($_GET['tukhoa']);

    if (empty($searchTerm)) {
        $error = "Vui lòng nhập từ khóa để tìm kiếm.";
    } else {
        // Lặp qua mảng sản phẩm để tìm kết quả
        foreach ($products as $product) {
            // Dùng stripos để tìm kiếm không phân biệt chữ hoa/thường
            if (stripos($product['name'], $searchTerm) !== false || stripos($product['description'], $searchTerm) !== false) {
                $results[] = $product; // Thêm sản phẩm khớp vào mảng kết quả
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tìm Kiếm Nâng Cao</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="search-container">
        <h1>Công Cụ Tìm Kiếm</h1>

        <!-- Form tìm kiếm, action trỏ về chính nó -->
        <form action="search.php" method="get">
            <input 
                type="text" 
                name="tukhoa" 
                class="search-input" 
                placeholder="Nhập tên sản phẩm, mô tả..."
                value="<?php echo htmlspecialchars($searchTerm); ?>"
            >
            <button type="submit" class="btn-search">Tìm Kiếm</button>
        </form>

        <?php if (!empty($error)): ?>
            <p class="error-message"><?php echo $error; ?></p>
        <?php endif; ?>

        <!-- --- KHU VỰC HIỂN THỊ KẾT QUẢ --- -->
        <?php if ($isSearchPerformed && empty($error)): ?>
            <div class="results-container">
                <h2>Kết quả tìm kiếm cho: "<?php echo htmlspecialchars($searchTerm); ?>"</h2>

                <?php if (!empty($results)): ?>
                    <?php foreach ($results as $item): ?>
                        <div class="result-item">
                            <h3><?php echo htmlspecialchars($item['name']); ?></h3>
                            <p><?php echo htmlspecialchars($item['description']); ?></p>
                        </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p class="no-results">Không tìm thấy sản phẩm nào phù hợp.</p>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>