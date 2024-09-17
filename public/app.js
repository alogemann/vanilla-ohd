//set variables for data selection
const btnAdd = document.querySelector("#varAdd");
const wkshtCode = 'S100000';
const lineNum = document.querySelector("#lineNum");
const clmNum = document.querySelector("#clmNum");
let variables = {};
let varCount = 0;

//add variable to worksheet
btnAdd.addEventListener("click", () => {
    if(lineNum.value === '' | clmNum.value === '') {
        alert("please select variables to add")
        return
    } else {
        let crVar = {
            "wksht_cd": wkshtCode,
            "clmn_num": clmNum.value,
            "line_num": lineNum.value,
        }
        varCount++;
        variables[`var_${varCount}`] = crVar

        let varItm = document.createElement("h5");
        varItm.className = 'var-list-itm'
        let del = document.createElement("button")
        del.innerText = 'x'
        del.className = 'btn-del-itm'
        
        varItm.innerText = `[column number: ${clmNum.value}] [line number: ${lineNum.value}]`
        varItm.appendChild(del)

        varList.appendChild(varItm)
        if (varCount === 1) {
            varList.className = 'var-list'
        }

        //add delete button to worksheet variable
        del.addEventListener("click", function() {
            varItm.remove()
            delete variables[`var_${varCount}`]
            varCount--;

            if (varCount === 0) {
                varList.className = ''  
            }
        })

        //reset form values after variable added to worksheet
        lineNum.value = '';
        clmNum.value = '';

        //print variable object for testing
        console.log(variables)
    }
})
