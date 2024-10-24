// Data của sản phẩm
const LCS_SP = [
  {
    id: "SP_01",
    ten: "Giày Bóng Đá Nike Zoovapor 15 Academy Tf - Hồng",
    anh: "./img_admin/./img_product/giay/giay1.png",
    gia: 1565000,
    loai: "Giay",
    thuonghieu: "Nike",
  },
  {
    id: "SP_02",
    ten: "Giày Đá Bóng Nike Zoom Mercurial Superfly 9 Academy Km Tf - Xanh Dương",
    anh: "./img_admin/./img_product/giay/giay2.png",
    gia: 1859000,
    loai: "Giay",
    thuonghieu: "Nike",
  },
  {
    id: "SP_03",
    ten: "Giày Đá Bóng Nam Nike Phantom Gx Academy Tf - Xám",
    anh: "./img_admin/./img_product/giay/giay3.png",
    gia: 1565000,
    loai: "Giay",
    thuonghieu: "Nike",
  },
  {
    id: "SP_04",
    ten: "Giày Đá Bóng Nam Nike Zoom Superfly 9 Academy Firmground - Xanh Mint",
    anh: "./img_admin/./img_product/giay/giay4.png",
    gia: 1763000,
    loai: "Giay",
    thuonghieu: "Nike",
  },
  {
    id: "SP_05",
    ten: "Giày Đá Bóng Nike Zoom Superfly 10 Academy - Xanh Dương",
    anh: "./img_admin/./img_product/giay/giay5.png",
    gia: 3059000,
    loai: "Giay",
    thuonghieu: "Nike",
  },
  {
    id: "SP_06",
    ten: "Giày Đá Bóng Unisex Adidas Copa Pure 2 League - Đen",
    anh: "./img_admin/./img_product/giay/giay6.png",
    gia: 2100000,
    loai: "Giay",
    thuonghieu: "Adidas",
  },
  {
    id: "SP_07",
    ten: "Giày Bóng Đá Adidas X Crazyfast Elite Fg - Vàng",
    anh: "./img_admin/./img_product/giay/giay7.png",
    gia: 3480000,
    loai: "Giay",
    thuonghieu: "Adidas",
  },
  {
    id: "SP_08",
    ten: "Giày Đá Bóng Unisex Adidas Predator Elite Tf - Đen",
    anh: "./img_admin/./img_product/giay/giay8.png",
    gia: 2450000,
    loai: "Giay",
    thuonghieu: "Adidas",
  },
  {
    id: "SP_09",
    ten: "Giày Đá Bóng Unisex Adidas Copa Pure 2 Club Tf - Trắng",
    anh: "./img_admin/./img_product/giay/giay9.png",
    gia: 1050000,
    loai: "Giay",
    thuonghieu: "Adidas",
  },
  {
    id: "SP_10",
    ten: "Giày Đá Bóng Unisex Adidas Predator League Tf - Hồng",
    anh: "./img_admin/./img_product/giay/giay10.png",
    gia: 2400000,
    loai: "Giay",
    thuonghieu: "Adidas",
  },
];

//Đưa data vào localstorage
localStorage.setItem("DS_SP", JSON.stringify(LCS_SP));
//Lấy data
const ds_sp1 = JSON.parse(localStorage.getItem("DS_SP"));

////////////////////////////////////////////////////////CÁC HÀM THỰC THI/////////////////////////////////////////////////
const SP = JSON.parse(localStorage.getItem("DS_SP"));
var ds_sp = SP;
// const ds_sp1 = JSON.parse(localStorage.getItem("DS_SP"));
// console.log(ds_sp);

let content1 = document.querySelector("#Content1");
let content2 = document.querySelector("#Content2");
let content3 = document.querySelector("#Content3");
let content4 = document.querySelector("#Content4");

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
  content1.style.display = "none";
  content2.style.display = "none";
  content3.style.display = "none";
  content4.style.display = "none";
}

////////////////////////////////////////////CODE ĐỂ PHÂN TRANG/////////////////////////////////////////////////////////

//Các biến để phân trang
let currentPage = 1; //Thứ tự của trang
let perPage = 5; //Số sản phẩm trên trang
let totalPage; //Tổng số trang
let perSP = []; //Mảng chứa các sp trên 1 trang

function xuatDSSP() {
  handlePage(1);
  renderPage();
}

//Danh sách trang
function renderPage() {
  totalPage = Math.ceil(ds_sp.length / perPage);
  let page = document.querySelector("#pagination");
  page.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    page.innerHTML += `<li onclick="handlePage(${i})">${i}</li>`;
  }
}

function handlePage(num) {
  currentPage = num;
  //Cắt SP từ mảng ds_sp
  perSP = ds_sp.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage
  );
  xuatSP();
}

//Hàm xuất danh sách sản phẩm
function xuatSP() {
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
    <button id="xoa" onclick="xoaSP(${ds_sp.indexOf(i)})">Xoá</button>
    <button id="chinh_sua" onclick="sua_SP()">Sửa</button>
    </tr>`;
    // console.log(ds_sp.indexOf(i) + "hello");
  });

  let e = document.querySelector("#table1");
  e.innerHTML = s;

  //Để display của các content khác là none
  content1.style.display = "block";
  content2.style.display = "none";
  content3.style.display = "none";
  content4.style.display = "none";

  form_tim_kiem();
}

//////////////////////////////////////////////////////////////HÀM ĐỂ XOÁ SẢN PHẨM///////////////////////////////////////////////////

function xoaSP(num) {
  let k = num;
  let dssp = JSON.parse(localStorage.getItem("DS_SP"));
  if (confirm("Bạn có muốn xoá sản phẩm không ?")) {
    dssp.splice(num, 1); //Xoá trên localStorage
    ds_sp.splice(num, 1); //Xoá trên màn hình hiển thị
  }
  localStorage.setItem("DS_SP", JSON.stringify(dssp));
  handlePage(Math.ceil(k / perPage));
  renderPage();
}

///////////////////////////////////////////////////////////////CODE ĐỂ TÌM KIẾM/////////////////////////////////////////////////////

function form_tim_kiem() {
  let elm = document.querySelector("#timkiem");
  elm.style.backgroundColor = "gray";
  elm.innerHTML = "";
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
      <option value="1000000">1.000.000</option>
      <option value="2000000">2.000.000</option>
      <option value="3000000">3.000.000</option>
      <option value="4000000">4.000.000</option>
      <option value="5000000">5.000.000</option>
    </select> 
    
    <select id="gia2" name="gia">
      <option value="0">0</option>
      <option value="1000000">1.000.000</option>
      <option value="2000000">2.000.000</option>
      <option value="3000000">3.000.000</option>
      <option value="4000000">4.000.000</option>
      <option value="5000000">5.000.000</option>
    </select> 
  </div>

  <input type="submit" name="submit" value="Tìm kiếm" style="padding:5px;" onclick="timKiemSP()">
  `;
}

function timKiemSP() {
  ds_sp = SP;
  let tenSP = document.querySelector("#ten_SP").value;
  let loaiSP = document.querySelector("#phanloai").value;
  let gia1 = document.querySelector("#gia1").value;
  let gia2 = document.querySelector("#gia2").value;
  let thuonghieu = document.querySelector("#thuong_hieu").value;
  if (gia1 >= gia2 && gia1 === 0) {
    alert("Bạn đã chọn sai giá hãy nhập lại?");
    return;
  }

  if (tenSP !== "") {
    ds_sp = ds_sp.filter((value) => {
      return value.ten.toLowerCase().includes(tenSP.toLowerCase());
    });
  }
  if (loaiSP !== "Chọn") {
    ds_sp = ds_sp.filter((value) => {
      return value.loai.toLowerCase().includes(tenSP.toLowerCase());
    });
  }

  if (gia1 < gia2) {
    ds_sp = ds_sp.filter((value) => {
      return value.gia >= gia1 && value.gia <= gia2;
    });
  }

  if (thuonghieu !== "Chọn") {
    ds_sp = ds_sp.filter((value) => {
      return value.thuonghieu.toLowerCase().includes(thuonghieu.toLowerCase());
    });
  }
  console.log(tenSP + " " + loaiSP + " " + thuonghieu);
  console.log(ds_sp);
  xuatDSSP();
}
