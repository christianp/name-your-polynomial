function solve(y,n) {
  var out = [];
  if(!n.isInteger()) {
      throw(new Error("Your \\(N\\) is not an integer. That's not allowed!"));
  }
  if(!y.isInteger()) {
      throw(new Error("Your \\(f(N)\\) is not an integer, so one of your coefficients must not be an integer. That's not allowed!"));
  }
  if(y.eq(0)) {
    return [new BigNumber(0)]
  } else if(n.eq(1)) {
    throw(new Error("Your \\(N\\) must be bigger than all of your coefficients. You've chosen \\(N=1\\), so every coefficient of your polynomial would have to be zero. However, the value of \\(f(N)\\) you gave contradicts that."))
  } else if(n.lt(1)) {
    throw(new Error("Your \\(N \\lt 1\\)! That's not allowed!"))
  } else if(y.lte(0)) {
    throw(new Error("One of your coefficients is \\(\\leq 0\\)! That's not allowed!"))
  }
  while(y.gt(0)) {
    var m = y.mod(n);
    out.push(m);
    y = y.minus(m).div(n);
    if(out.length>10) {
      throw(new Error("Too long"))
    }
  }
  return out;
}

function display(coefficients) {
  if(!coefficients.filter(function(c){return !c.isZero()}).length) {
    // if all terms are zero
    return '0';
  }
  var terms = [];
  for(var i=0;i<coefficients.length;i++) {
    var c = coefficients[i];
    if(c.gt(0)) {
      if(i==0) {
        terms.splice(0,0,c+'');
      } else {
        terms.splice(0,0,(c.eq(1)?'':c+' ')+(i>0?'x'+(i>1?'^{'+i+'}':''):''));
      }
    }
  }
  return terms.join(' + ');
}

var n_input = document.getElementById('n');
var f_input = document.getElementById('f-of-n');
var polynomial_display = document.getElementById('polynomial');
var output_div = document.getElementById('output');
var answer_p = document.getElementById('answer');
var error_p = document.getElementById('error');

function do_solve() {
  var n = new BigNumber(n_input.value);
  var f = new BigNumber(f_input.value);
  output_div.classList.remove('answer');
  output_div.classList.remove('error');
  try {
    var coefficients = solve(f,n);
    polynomial_display.textContent = '\\('+display(coefficients)+'\\)';
    MathJax.Hub.Queue(['Typeset',MathJax.Hub,polynomial_display]);
    output_div.classList.add('answer');
  } catch(e) {
    error_p.textContent = e.message;
    output_div.classList.add('error');
    MathJax.Hub.Queue(['Typeset',MathJax.Hub,error_p]);
  }
}

var solve_button = document.getElementById('solve');
solve_button.addEventListener('click',do_solve)
