(async function(){
const data = await fetch('./data.json')
const res = await data.json()

let employees = res;

let selectedEmployeeID = employees[0].id;
let selectedEmployee = employees[0];

let employeeList = document.querySelector('.employees_name--list');
let employeeInfo = document.querySelector('.employees_single--list');

let createEmployee = document.querySelector('.CreateEmployee')
let addEmployeeModal = document.querySelector('.addEmployee')
let addEmployeeForm = document.querySelector('.addEmployee--create')

createEmployee.addEventListener('click',(e)=>{
   addEmployeeModal.style.display = 'flex';
})

addEmployeeModal.addEventListener('click',(e)=>{
   if(e.target.className === 'addEmployee'){
   addEmployeeModal.style.display='none'
}})

const dobInput = document.querySelector(".addEmployee--dob");
dobInput.max = `${new Date().getFullYear() - 20}-${new Date().toISOString().slice(5, 10)}`  

//Add Employee
addEmployeeForm.addEventListener('submit',(e)=>{
   e.preventDefault();

   const formData = new FormData(addEmployeeForm)
   const values = [...formData.entries()]
   const empData = {}

   values.forEach((val)=>{
         empData[val[0]]=val[1]
      });

    empData.id = employees[employees.length-1].id+1
    empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png"
    empData.age = new Date().getFullYear()-parseInt(empData.dob.slice(0,4),10)
    employees.push(empData)
    renderEmployeeList();
    addEmployeeForm.reset();
    addEmployeeModal.style.display='none';

})


// Selected Employee
employeeList.addEventListener('click',(e)=>{
    if(e.target.tagName === "SPAN" && selectedEmployeeID!=e.target.id)
    {
      selectedEmployeeID = e.target.id ;
       renderEmployeeList();
       renderSingleEmployee();
    }

       if (e.target.tagName === "I") {
         employees = employees.filter(
           (emp) => String(emp.id) !== e.target.parentNode.id
         );
         if (String(selectedEmployeeID) === e.target.parentNode.id) {
            selectedEmployeeID = employees[0]?.id || -1;
           selectedEmployee = employees[0] || {};
           renderSingleEmployee();
         }
         renderEmployeeList();
       }
      })

// RenderEmployeeList
const renderEmployeeList = () =>{
   employeeList.innerHTML = " ";
   employees.forEach((emp)=>{
    let employee = document.createElement('span');
      employee.classList.add('employee_name--item')

      if(parseInt(selectedEmployeeID,10) === emp.id){
        employee.classList.add('selected')
        selectedEmployee = emp;  
         }

    employee.setAttribute("id", emp.id)
    employee.innerHTML=`${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`

    employeeList.append(employee)
        
   })

};


// RenderSingle Employee
const renderSingleEmployee=()=>{
  
   if (selectedEmployeeID === -1) {
      employeeInfo.innerHTML = "";
      return;
    }

  employeeInfo.innerHTML = `
  <img src="${selectedEmployee.imageUrl}"/>
  <span class="employee_name--line">
  ${selectedEmployee.firstName} ${selectedEmployee.lastName} </span>
  <span>Age : ${selectedEmployee.age}</span>
  <span>DOB : ${selectedEmployee.dob}</span>
  <span>Address : ${selectedEmployee.address}</span>
  <span> Email : ${selectedEmployee.email}</span>  
  <span> Salary : ${selectedEmployee.salary}</span>  
 <span>Contact No : ${selectedEmployee.contactNumber}</span>  `
}
renderEmployeeList();
if(selectedEmployee) renderSingleEmployee();

})();