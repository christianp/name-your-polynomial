function solve(y,n) {
    var out = [];
    if(y == 0n) {
        return [0n]
    } else if(n == 1n) {
        throw(new Error("Your <math><mi>N</mi></math> must be bigger than all of your coefficients. You've chosen <math><mi>N</mi><mo>=</mo><mn>1</mn></math>, so every coefficient of your polynomial would have to be zero. However, the value of <math><mi>f</mi><mo>&#x2061;</mo><mrow><mo>(</mo><mi>N</mi><mo>)</mo></mrow></math> that you gave contradicts that."))
    } else if(n < 1n) {
        throw(new Error("Your <math><mi>N</mi><mo>&lt;</mo><mn>1</mn></math>! That's not allowed!"))
    } else if(y <= 0n) {
        throw(new Error("One of your coefficients is negative! That's not allowed!"))
    } else if(y < n) {
        throw(new Error("One of your coefficients is a fraction! That's not allowed!"));
    }
    while(y > 0n) {
        var m = y % n;
        out.push(m);
        y = (y-m)/n;
    }
    return out;
}

function display(coefficients) {
    if(!coefficients.filter(function(c){return c != 0n}).length) {
        // if all terms are zero
        return '<mn>0</mn>';
    }
    var terms = [];
    for(var i=coefficients.length-1; i>=0; i--) {
        var c = coefficients[i];
        if(c > 0n) {
            if(i == 0n) {
                terms.push(`<mn>${c}</mn>`);
            } else {
                terms.push((c == 1n ? '' : `<mn>${c}</mn><mo>\u2062</mo>`)+(i > 0n ? i > 1n ? `<msup><mi>x</mi><mn>${i}</mn></msup>` : '<mi>x</mi>' : ''));
            }
        }
    }
    return terms.join(' <mo>+</mo> ');
}

const form = document.querySelector('form');
var polynomial_display = document.getElementById('polynomial');
var output_div = document.querySelector('output');
var answer_p = document.getElementById('answer');
var error_p = document.getElementById('error');
var n_hint = document.getElementById('n-hint');

function do_solve() {
    const fd = new FormData(form);
    try {
        output_div.classList.remove('answer');
        output_div.classList.remove('error');
        var n = BigInt(fd.get('n'));
        var f = BigInt(fd.get('f-of-n'));
        var coefficients = solve(f,n);
        polynomial_display.innerHTML = display(coefficients);
        output_div.classList.add('answer');

        let biggest = coefficients[0];
        for(let c of coefficients) {
            biggest = c > biggest ? c : biggest;
        }
        let p = 1n;
        while(p < biggest) {
            p *= 10n;
        }
        if(p == n) {
            output_div.classList.remove('show-hint');
        } else {
            output_div.classList.add('show-hint');
            n_hint.textContent = p;
        }

    } catch(e) {
        error_p.innerHTML = e.message;
        output_div.classList.add('error');
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    do_solve();
});
