var $ = function (id) {
    return document.getElementById(id); 
};

function calculateSalesTax(subtotal, tax_rate){
	var sales_tax = (subtotal*tax_rate/100);
	sales_tax=sales_tax.toFixed(2);
	return sales_tax;
};

function calculateTotal(subtotal,tax_rate){
	var total = parseFloat(subtotal)+parseFloat((subtotal*tax_rate/100))
	total=total.toFixed(2);
	return total;
}

var processEntries = function(){
	var subtotal = $("subtotal").value;
	var tax_rate = $("tax_rate").value;
	if(isNaN(subtotal)||subtotal<=0||subtotal>9999){
		alert("subtotal must be > 0 and < 10000");
		$("subtotal").focus();
	}
	else if(isNaN(tax_rate)||tax_rate<=0||tax_rate>11){
		alert("tax rate must be > 0 and <12");
		$("tax_rate").focus;
	}
	else{
		$("sales_tax").value=calculateSalesTax(subtotal, tax_rate);
		$("total").value=calculateTotal(subtotal, tax_rate);
		$("subtotal").focus();
	}
};

var clearEntries = function(){
	$("subtotal").value = "";
	$("tax_rate").value = "";
	$("sales_tax").value = "";
	$("total").value = "";
	$("subtotal").focus();
};

window.onload=function(){
	$("calculate").onclick=processEntries;
	$("clear").onclick=clearEntries;
	$("subtotal").ondblclick=clearEntries;
	$("tax_rate").ondblclick=clearEntries;
	$("subtotal").focus();
};
