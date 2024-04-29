window.addEventListener("DOMContentLoaded",() => {
	const ctl = new CollapsibleTimeline("#timeline");
});

class CollapsibleTimeline {
	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.el?.addEventListener("click",this.itemAction.bind(this));
	}
	animateItemAction(button,ctrld,contentHeight,shouldCollapse) {
		const expandedClass = "timeline__item-body--expanded";
		const animOptions = {
			duration: 300,
			easing: "cubic-bezier(0.65,0,0.35,1)"
		};

		if (shouldCollapse) {
			button.ariaExpanded = "false";
			ctrld.ariaHidden = "true";
			ctrld.classList.remove(expandedClass);
			animOptions.duration *= 2;
			this.animation = ctrld.animate([
				{ height: `${contentHeight}px` },
				{ height: `${contentHeight}px` },
				{ height: "0px" }
			],animOptions);
		} else {
			button.ariaExpanded = "true";
			ctrld.ariaHidden = "false";
			ctrld.classList.add(expandedClass);
			this.animation = ctrld.animate([
				{ height: "0px" },
				{ height: `${contentHeight}px` }
			],animOptions);
		}
	}
	itemAction(e) {
		const { target } = e;
		const action = target?.getAttribute("data-action");
		const item = target?.getAttribute("data-item");

		if (action) {
			const targetExpanded = action === "expand" ? "false" : "true";
			const buttons = Array.from(this.el?.querySelectorAll(`[aria-expanded="${targetExpanded}"]`));
			const wasExpanded = action === "collapse";

			for (let button of buttons) {
				const buttonID = button.getAttribute("data-item");
				const ctrld = this.el?.querySelector(`#item${buttonID}-ctrld`);
				const contentHeight = ctrld.firstElementChild?.offsetHeight;

				this.animateItemAction(button,ctrld,contentHeight,wasExpanded);
			}

		} else if (item) {
			const button = this.el?.querySelector(`[data-item="${item}"]`);
			const expanded = button?.getAttribute("aria-expanded");

			if (!expanded) return;

			const wasExpanded = expanded === "true";
			const ctrld = this.el?.querySelector(`#item${item}-ctrld`);
			const contentHeight = ctrld.firstElementChild?.offsetHeight;

			this.animateItemAction(button,ctrld,contentHeight,wasExpanded);
		}
	}
}
function submitQuiz() {
	const q1 = document.querySelector('input[name="q1"]:checked').value;
	const q2 = document.querySelector('input[name="q2"]:checked').value;

	let result = '';

	if (q1 === 'a' && q2 === 'a') {
		result = 'Tesouro Selic';
	}else if (q1 === 'a' && q2 === 'b') {
		result = 'CDB';
	} 
	else if (q1 === 'a' && q2 === 'c') {
		result = 'Prograns de cashback, mesmo não sendo investimentos, eles são de curto prazo e não tem um custo definido.';
	} 
	else if (q1 === 'b' && q2 === 'b') {
		result = 'Tesouro Direto';
	} else if (q1 === 'c' && q2 === 'c') {
		result = 'Poupança , mesmo com suas desvantagens a poupança pode ser útil para pessoas que ainda não sabem muito sobre investimentos e/ou estão apenas começando.';
	}
	else if (q1 === 'c' && q2 === 'a') {
		result = 'LCI e LCA';
	}
	else if (q1 === 'b' && q2 === 'c') {
		result = 'Tesouro Direto';
	}
	else if (q1 === 'b' && q2 === 'a') {
		result = 'Tesouro Direto';
	}
	else if (q1 === 'c' && q2 === 'b') {
		result = 'algum tipo de cartão de crédito mais caro, mesmo não sendo um investimento ele não tem um prazo definido e dependendo do tipo são caros.';
	} 
	document.getElementById('result').innerText = 'O tipo de investimento para você é:  ' + result;
}
function calculateCashback() {  //função que calcula o cashback
    var quantidade = parseFloat(document.getElementById("quantidade").value);
    var porcentagem = parseFloat(document.getElementById("porcentagem").value);

    if (isNaN(quantidade) || isNaN(porcentagem)) {
        document.getElementById("result").innerHTML = "Porfavor insira valores validos.";
    } else {
        var cashback = (quantidade * porcentagem) / 100;
        document.getElementById("result").innerHTML = "Cashback: R$" + cashback.toFixed(2);
    }
}