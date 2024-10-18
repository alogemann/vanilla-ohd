/* 
Custom Cost Report Data App 1.0
Javascript app for client to build custom cost report data 
and return data as csv file to client

Version 1.0 -
Client required to input valid worksheet and line/column 
numbers for cost report fields.

App checks for valid worksheet, but if column/line number
inputs invalid, dataframe will have null valued for those
fields. 

Logic:
  
    1.  Client chooses desired facilities
        a.  facility attributes - 
            - chain
            - state
            - city
            - county
            - year range

    2. Client chooses preset cost report fields
        a.  facility information - 
            - name
            - city
            - county
            - state
            - chain
            - report start date
            - report end date
        b.  financial information
            - tbd from IU + AHD
        c. utilization information
            - tbd from IU and AHD

    3.  Client chooses worksheet form
        a.  Worksheet selection adds new worksheet pane to page with
            inputs for column and line number fields
        b.  Client makes column and line selection and adds variable
            to data cart. 
        c.  repeat for all variables in worksheet
    
    4.  Repeat Step 1. for all desired worksheets and fields

    5. Client selects 'create dataset'
        a. navigate to new page to review and finalize dataset
        b. if data is correct, build dataset
        c. data is sent to client in csv format
    
    6.  Validations -
        a.  App will check if worksheet has already been added to page
        b.  App will check if variable has already been added to dataset

    
*/


//set variables for data selection
const varForm = document.querySelector('#var-form')
const varCart = document.querySelector('#var-cart')
const btnWkshtSelect = document.querySelector('#btn-wksht-select')
const wksht = document.querySelector('#wksht-select')
let Cart = {}
let variables = {};
let varCount = 0;

//choose wksht and build form
btnWkshtSelect.addEventListener('click', () => {
    let wksht_cd = wksht.value;

    if (document.querySelector(`#${wksht.value}`)) {
        return alert('worksheet already created')
    } 
    //get elements
    let wkshtDiv = document.createElement('div')
    let h3 = document.createElement('h3')
    let nameLabel = document.createElement('label')
    let nameInput = document.createElement('input')
    let clmnLabel = document.createElement('label')
    let clmnSelect = document.createElement('select')
    let lineLabel = document.createElement('label')
    let lineSelect = document.createElement('select')
    let btnAdd = document.createElement('button')
    let varList = document.createElement('p')

    //set element attributes
    wkshtDiv.id = wksht.value
    wkshtDiv.classList.add('var-add-form')
    h3.innerText = `Worksheet ${wksht.options[wksht.options.selectedIndex].innerText}`
    nameLabel.for = 'varName'
    nameLabel.innerText = 'Variable name:'
    nameInput.type = 'text'
    nameInput.id = 'varName'
    clmnLabel.for = 'varClmn'
    clmnLabel.innerText = 'Column number:'
    clmnSelect.id = 'varClmn'
    lineLabel.for = 'varLine'
    lineLabel.innerText = 'Line number:'
    lineSelect.id = 'varSelect'
    btnAdd.classList.add('var-add-btn')
    btnAdd.id = `var-add-btn-${wksht.value}`
    btnAdd.innerText = '+ Add'
    varList.id = 'var-list'

    //set default select values
    let lineDefault = document.createElement('option')
    lineDefault.value = ''
    lineSelect.appendChild(lineDefault)

    let clmnDefault = document.createElement('option')
    clmnDefault.value = ''
    clmnSelect.appendChild(clmnDefault)

    //set options for clmn and line select elements
    //hard coding entries for testing, end product will fetch 
    //options from database
    for (let i = 1; i < 11; i++) {
        let opt = document.createElement('option')
        opt.value = `00${i}00`
        opt.innerHTML = i
        clmnSelect.appendChild(opt)
    }
    for (let i = 1; i < 11; i++) {
        let opt = document.createElement('option')
        opt.value = `00${i}00`
        opt.innerHTML = i
        lineSelect.appendChild(opt)
    }

    
    
    //append items to wkshtDiv
    wkshtDiv.appendChild(h3)
    wkshtDiv.appendChild(nameLabel)
    wkshtDiv.appendChild(nameInput)
    wkshtDiv.appendChild(lineLabel)
    wkshtDiv.appendChild(lineSelect)
    wkshtDiv.appendChild(clmnLabel)
    wkshtDiv.appendChild(clmnSelect)
    wkshtDiv.appendChild(btnAdd)
    wkshtDiv.appendChild(varList)


    //append wksht to varForm
    varForm.appendChild(wkshtDiv)

    //add variable to worksheet
    btnAdd.addEventListener("click", () => {
        if(nameInput.value === '') {
            alert('please add variable name')
        }
        else if(lineSelect.value === '' | clmnSelect.value === '') {
            alert("please select variables to add")
            return
        } else {
            let crVar = {
                "var_name": nameInput.value,
                "wksht_cd": wksht_cd,
                "clmn_num": clmnSelect.value,
                "line_num": lineSelect.value,
            }
            varCount++;
            variables[`var_${varCount}`] = crVar

            let varItm = document.createElement("h4");
            varItm.className = 'var-list-itm'
            let del = document.createElement("button")
            del.innerText = 'x'
            del.className = 'btn-del-itm'
            
            varItm.innerText = `[variable name: ${nameInput.value}][column number: ${clmnSelect.value}][line number: ${lineSelect.value}]`
            varItm.appendChild(del)

            varList.appendChild(varItm)
            if (varCount === 1) {
                varList.className = 'var-list'
            }

            //add delete button to worksheet variable
            del.addEventListener("click", () => {
                varItm.remove()
                delete variables[`var_${varCount}`]
                varCount--;

                if (varCount === 0) {
                    varList.className = ''  
                }
            })

            //reset form values after variable added to worksheet
            nameInput.value = '';
            lineSelect.value = '';
            clmnSelect.value = '';

            //print variable object for testing
            console.log(variables)
        }
    })

})


