#Custom Alert
Substitue as funções alert() e confirm() do JavaScript, permitindo customiza-las. Essa aplicação não usa jQuery ou outro framework, somente JavaScript e CSS.

Atualmente funciona perfeitamentem em:
FF, Chrome, IE(**>=9**)
 
Os códigos de estilo estão em *css/customAlert.css*. Caso esteja usando o preprocessador de estilo [Stylus](learnboost.github.io/stylus), css*/customAlert.styl*.
 


>###ATENÇÂO
>  *window.customAlert* e *window.customConfirm* devem permanecer com esses nomes, a não se que vc saiba o que esta fazendo.
 
 
##Configurações
Vocẽ pode adicionar configuraçãos na declaração de ambos.

	new customConfirm({
	        execute : false,
	        title : 'Atenção!'
	    });
	    
	new customAlert({
	        title : 'Isso é um alerta!'
	    });
 
###CONFIGURAÇÔES PADRÕES
 
As configuraçãos padrões do *customAlert()* são:
* **title : 'Alert!'** Texto do título do alert.
* **ok : 'OK'** : Texto do botão de conclusão do alert.


As configuraçãos padrões do *customConfirm()* são:
* **title : 'Confirm it'** Texto do título do confirm.
* **yes : 'YES'** Texto do botão de retorno TRUE.
* **no : 'NO'** Texto do botão de retorno FALSE.
* **return : 'false'** Se TRUE ativa retorno boolean. Se FALSE, executa o callback sem retornar nenhum parametro caso o úsuario selecione o botão TRUE. Caso selecione o botão FALSE nada acontece, além de fechar o confirm.


##EXEMPLOS
 
###Alert simples
	alert('Isso é um exemplo')

###Alert avançado
	alert('Isso é um exemplo',{
                                title : 'Exemplo de uso',
                                ok : 'Eu já sei'
                                })
 
###Confirm simples
	confirm('Isso é um exemplo?', function(){ console.log('Confirmado! Callback chamado!') })

###Confirm avançado
	confirm(
		'Isso é um exemplo?',
		function(data){
			console.log('Exemplo: '+data)
		},
		{
			return : true
			title : 'Um belo exemplo não?',
			yes : 'Muito Bom',
			no : 'Não, adeus!'
		}
	)
 
###Confirm sem retorno
Nesse caso o callback do *confirm()* não retornara nada, ou seja **undefined**

	confirm(
			 'Isso é um exemplo?',
			 function(){//Sem necessidade de parametros aqui
			                console.log('Confirmado! Callback chamado de novo!')
			            },
			 {
				 return : false // O parametro return é false por padrão
			 }
	 )



Qualquer dúvida ou sujestão, contate
[assis@philippeassis.com](mailto:assis@philippeassis.com)

Divirta-se!
