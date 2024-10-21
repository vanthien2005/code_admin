// Data của sản phẩm
// const ds_sp = [
//   {
//     id: "SP_01",
//     ten: "Giày Bóng Đá Nike Zoovapor 15 Academy Tf - Hồng",
//     anh: "./img_admin/./img_product/giay/giay1.png",
//     gia: 1565000,
//     thuonghieu: "Nike",
//   },
//   {
//     id: "SP_02",
//     ten: "Giày Đá Bóng Nike Zoom Mercurial Superfly 9 Academy Km Tf - Xanh Dương",
//     anh: "./img_admin/./img_product/giay/giay2.png",
//     gia: 1859000,
//     thuonghieu: "Nike",
//   },
//   {
//     id: "SP_03",
//     ten: "Giày Đá Bóng Nam Nike Phantom Gx Academy Tf - Xám",
//     anh: "./img_admin/./img_product/giay/giay3.png",
//     gia: 1565000,
//     thuonghieu: "Nike",
//   },
//   {
//     id: "SP_04",
//     ten: "Giày Đá Bóng Nam Nike Zoom Superfly 9 Academy Firmground - Xanh Mint",
//     anh: "./img_admin/./img_product/giay/giay4.png",
//     gia: 1763000,
//     thuonghieu: "Nike",
//   },
//   {
//     id: "SP_05",
//     ten: "Giày Đá Bóng Nike Zoom Superfly 10 Academy - Xanh Dương",
//     anh: "./img_admin/./img_product/giay/giay5.png",
//     gia: 3059000,
//     thuonghieu: "Nike",
//   },
//   {
//     id: "SP_06",
//     ten: "Giày Đá Bóng Unisex Adidas Copa Pure 2 League - Đen",
//     anh: "./img_admin/./img_product/giay/giay6.png",
//     gia: 2100000,
//     thuonghieu: "Adidas",
//   },
//   {
//     id: "SP_07",
//     ten: "Giày Bóng Đá Adidas X Crazyfast Elite Fg - Vàng",
//     anh: "./img_admin/./img_product/giay/giay7.png",
//     gia: 3480000,
//     thuonghieu: "Adidas",
//   },
//   {
//     id: "SP_08",
//     ten: "Giày Đá Bóng Unisex Adidas Predator Elite Tf - Đen",
//     anh: "./img_admin/./img_product/giay/giay8.png",
//     gia: 2450000,
//     thuonghieu: "Adidas",
//   },
//   {
//     id: "SP_09",
//     ten: "Giày Đá Bóng Unisex Adidas Copa Pure 2 Club Tf - Trắng",
//     anh: "./img_admin/./img_product/giay/giay9.png",
//     gia: 1050000,
//     thuonghieu: "Adidas",
//   },
//   {
//     id: "SP_10",
//     ten: "Giày Đá Bóng Unisex Adidas Predator League Tf - Hồng",
//     anh: "./img_admin/./img_product/giay/giay10.png",
//     gia: 2400000,
//     thuonghieu: "Adidas",
//   },
// ];

// //Đưa data vào localstorage
// localStorage.setItem("DS_SP", JSON.stringify(ds_sp));
// //Lấy data
// const ds_sp1 = JSON.parse(localStorage.getItem("DS_SP"));

////////////////////////////////////////////////////////CÁC HÀM THỰC THI/////////////////////////////////////////////////
const ds_sp = JSON.parse(localStorage.getItem("DS_SP"));
const ds_sp1 = JSON.parse(localStorage.getItem("DS_SP"));
console.log(ds_sp);

//Chỉnh lại format giá tiền
function formatCash(str) {
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ".") + prev;
    });
}

//Hàm trở về home
function gohome() {
  let elm1 = document.querySelector("#Content1");
  let elm2 = document.querySelector("#Content2");
  let elm3 = document.querySelector("#Content3");
  let elm4 = document.querySelector("#Content4");
  elm1.style.display = "none";
  elm2.style.display = "none";
  elm3.style.display = "none";
  elm4.style.display = "none";
}

////////////////////////////////////////////CODE ĐỂ PHÂN TRANG/////////////////////////////////////////////////////////

//Các biến để phân trang
let currentPage = 1; //Thứ tự của trang
let perPage = 5; //Số sản phẩm trên trang
let totalPage; //Tổng số trang
let perSP = []; //Mảng chứa các sp trên 1 trang

//Danh sách trang
var visited = false; //Kiểm tra đã vào hàm xuatDS_Page chưa
function xuatDS_Page() {
  totalPage = ds_sp.length / perPage;
  if (visited === false) {
    for (let i = 1; i <= totalPage; i++) {
      document.querySelector(
        "#pagination"
      ).innerHTML += `<li onclick="xuatDS_SP(${i})">${i}</li>`;
    }
    visited = true;
  }
}

//Hàm xuất danh sách sản phẩm
function xuatDS_SP(num) {
  xuatDS_Page();
  currentPage = num;
  //Cắt SP từ mảng ds_sp
  perSP = ds_sp.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage
  );
  let s1 = `Danh sách sản phẩm`;
  document.querySelector("#h1").innerHTML = s1;
  let s = `<tr>
    <th align="center">ID</th>
    <th align="center">Tên</th>
    <th align="center">Ảnh</th>
    <th align="center">Giá</th>
    <th align="center">Thương hiệu</th>
    <th align="center">Tuỳ chỉnh</th>
    </tr>`;
  perSP.forEach((i) => {
    let tien = formatCash(i.gia.toString()) + "đ";
    s += `<tr>
    <td align="center">${i.id}</td>
    <td>${i.ten}</td>
    <td><img src="${i.anh}" alt=""></td>
    <td align="center">${tien}</td>
    <td align="center">${i.thuonghieu}</td>
    <td align="center">
    <button id="xoa" onclick="xoa_SP(${ds_sp.indexOf(i)})">Xoá</button>
    <button id="chinh_sua" onclick="sua_SP()">Sửa</button>
    </tr>`;
  });

  let e = document.querySelector("#table1");
  e.innerHTML = s;

  //Để display của các content khác là none
  let elm1 = document.querySelector("#Content1");
  let elm2 = document.querySelector("#Content2");
  let elm3 = document.querySelector("#Content3");
  let elm4 = document.querySelector("#Content4");
  elm1.style.display = "block";
  elm2.style.display = "none";
  elm3.style.display = "none";
  elm4.style.display = "none";

  tim_kiem_SP();
}

//Hàm xoá SP
function xoa_SP(num) {
  // prompt("Bạn có muốn xoá không");
  ds_sp.splice(1, num);
  // xuatDS_SP(Math.ceil(num / perPage));
}

///////////////////////////////////////////////////////////////CODE ĐỂ TÌM KIẾM/////////////////////////////////////////////////////
var visited1 = false;
function tim_kiem_SP() {
  if (visited1 == true) return;

  visited1 = true;
  let elm = document.querySelector("#timkiem");
  elm.style.backgroundColor = "gray";
  elm.innerHTML += `
  <h2 align="center">Tìm kiếm sản phẩm</h2>
  <div id="tenSP">
    <label for="ten_SP">Lọc theo tên</label> <br>
    <input id="ten_SP" name="ten_SP" type="text" placeholder="Nhập vào sản phẩm">
  </div>
  
  <div id="loaiSP">
    <label for="phanloai">Loại sản phẩm</label> <br>
    <select id="phanloai" name="phanloai">
      <option value="Chọn">Chọn</option>
      <option value="Giày">Giày</option>
      <option value="Quần áo">Quần áo</option>
      <option value="Phụ kiện">Phụ kiện</option>
    </select>
  </div>

  <div id="thuonghieu">
    <label for="thuong_hieu">Thương hiệu</label> <br>
    <select id="thuong_hieu" name="thuong_hieu">
      <option value="Chọn">Chọn</option>
      <option value="Adidas">Adidas</option>
      <option value="Nike">Nike</option>
      <option value="Puma">Puma</option>
    </select>
  </div>

  <div id="giaSP">
    <label for="gia">Lọc theo giá</label> <br>
    <select id="gia1" name="gia" style="margin-right:10px">
      <option value="0">0</option>
      <option value="1.000.000">1.000.000</option>
      <option value="2.000.000">2.000.000</option>
      <option value="3.000.000">3.000.000</option>
      <option value="4.000.000">4.000.000</option>
      <option value="5.000.000">5.000.000</option>
    </select> 
    
    <select id="gia2" name="gia">
      <option value="0">0</option>
      <option value="1.000.000">1.000.000</option>
      <option value="2.000.000">2.000.000</option>
      <option value="3.000.000">3.000.000</option>
      <option value="4.000.000">4.000.000</option>
      <option value="5.000.000">5.000.000</option>
    </select> 
  </div>

  <input type="submit" name="submit" value="Tìm kiếm" style="padding:5px;" onclick="find_sp()">
  `;
}

function find_sp() {
  let locten = document.querySelector("#ten_SP");
  console.log(locten.value);
  let locloai = document.querySelector("#phanloai");
  console.log(locloai.value);
  let locgia1 = document.querySelector("#gia1");
  console.log(locgia1.value);
  let locgia2 = document.querySelector("#gia2");
  console.log(locgia2.value);
  let locthuonghieu = document.querySelector("#thuong_hieu");
  console.log(locthuonghieu.value);
  let a = locloai.value,
    b = locloai.value,
    e = locthuonghieu.value,
    c = locgia1.value,
    d = locgia2.value;
  const search1 = [];

  search1 = ds_sp.filter((value) => {
    return value.ten.toLowerCase().includes(a.toLowerCase());
  });
  console.log(ds_sp);
}
