// document.addEventListener('DOMContentLoaded', (event) => {
//     const itemsPerPage = 5; // 每页显示的项数
//     let currentPage = 1; // 当前页码

//     // 使用fetch API从JSON文件加载数据
//     fetch('Inventory.json')
//         .then(response => response.json())
//         .then(data => {
//             function displayTable(page, data) {
//                 const start = (page - 1) * itemsPerPage;
//                 const end = start + itemsPerPage;
//                 const tbody = document.querySelector('#infoTable tbody');
//                 tbody.innerHTML = ''; // 清空现有内容
                
//                 data.slice(start, end).forEach(item => {
//                     const row = document.createElement('tr');
//                     Object.keys(item).forEach(key => {
//                         const cell = document.createElement('td');
//                         cell.textContent = item[key];
//                         row.appendChild(cell);
//                     });
//                     tbody.appendChild(row);
//                 });

//                 updatePaginationControls(Math.ceil(data.length / itemsPerPage), currentPage);
//             }

//             function updatePaginationControls(totalPages, currentPage) {
//                 const paginationControls = document.getElementById('paginationControls');
//                 paginationControls.innerHTML = '';

//                 if (currentPage > 1) {
//                     const prevButton = document.createElement('button');
//                     prevButton.innerText = '上一页';
//                     prevButton.onclick = () => {
//                         currentPage--;
//                         displayTable(currentPage, data);
//                     };
//                     paginationControls.appendChild(prevButton);
//                 }

//                 if (currentPage < totalPages) {
//                     const nextButton = document.createElement('button');
//                     nextButton.innerText = '下一页';
//                     nextButton.onclick = () => {
//                         currentPage++;
//                         displayTable(currentPage, data);
//                     };
//                     paginationControls.appendChild(nextButton);
//                 }
//             }

//             // 初始加载
//             displayTable(currentPage, data);
//         })
//         .catch(error => console.error('Error loading the data:', error));
// });
document.addEventListener('DOMContentLoaded', (event) => {
    const itemsPerPage = 5; // 每页显示的项数
    let currentPage = 1; // 当前页码

    // 使用fetch API从JSON文件加载数据
    fetch('Inventory.json')
        .then(response => response.json())
        .then(data => {
            function displayTable(page, data) {
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const tbody = document.querySelector('#infoTable tbody');
                tbody.innerHTML = ''; // 清空现有内容
                 data.slice(start, end).forEach(item => {
                     const row = document.createElement('tr');
                     Object.keys(item).forEach(key => {
                         const cell = document.createElement('td');
                         cell.textContent = item[key];
                         row.appendChild(cell);
                     });
                     tbody.appendChild(row);
                 });
 
                 updatePaginationControls(Math.ceil(data.length / itemsPerPage), page);
             }
 
             function updatePaginationControls(totalPages, currentPage) {
                 const paginationControls = document.getElementById('paginationControls');
                 paginationControls.innerHTML = '';
 
                 // 上一页按钮
                 const prevButton = document.createElement('button');
                 prevButton.innerText = '上一页';
                 prevButton.onclick = () => {
                     if (currentPage > 1) {
                         currentPage--;
                         displayTable(currentPage, data);
                     }
                 };
                 prevButton.disabled = currentPage === 1;
                 if (prevButton.disabled) {
                     prevButton.style.backgroundColor = '#ccc'; // 更改背景颜色
                 }
                 paginationControls.appendChild(prevButton);
 
                 // 当前页码显示
                 const pageNumber = document.createElement('span');
                 pageNumber.className = 'page-number';
                 pageNumber.innerText = `第 ${currentPage} 页 共 ${totalPages} 页`;
                 paginationControls.appendChild(pageNumber);
 
                 // 下一页按钮
                 const nextButton = document.createElement('button');
                 nextButton.innerText = '下一页';
                 nextButton.onclick = () => {
                     if (currentPage < totalPages) {
                         currentPage++;
                         displayTable(currentPage, data);
                     }
                 };
                 nextButton.disabled = currentPage === totalPages;
                 if (nextButton.disabled) {
                     nextButton.style.backgroundColor = '#ccc'; // 更改背景颜色
                 }
                 paginationControls.appendChild(nextButton);
 
                 // 跳转输入框和按钮
                 const gotoLabel = document.createElement('span');
                 gotoLabel.innerText = '跳转至：';
                 paginationControls.appendChild(gotoLabel);
 
                 const gotoInput = document.createElement('input');
                 gotoInput.type = 'number';
                 gotoInput.min = '1';
                 gotoInput.max = totalPages;
                 gotoInput.value = currentPage;
                 paginationControls.appendChild(gotoInput);
 
                 const gotoButton = document.createElement('button');
                 gotoButton.innerText = '跳转';
                 gotoButton.onclick = () => {
                     const targetPage = parseInt(gotoInput.value, 10);
                     if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
                         currentPage = targetPage;
                         displayTable(currentPage, data);
                     } else {
                         alert('请输入有效的页码！');
                     }
                 };
                 paginationControls.appendChild(gotoButton);
             }
 
             // 初始加载
             displayTable(currentPage, data);
         })
         .catch(error => console.error('Error loading the data:', error));
 });
