$.ajax({type:"POST",url:"header.html",success:function(a){$(a).insertBefore("#afterHead");UserService.showUser()},error:function(a,c,b){}});$.ajax({type:"POST",url:"footer.html",async:false,success:function(a){$(a).insertAfter("#footerBefore")},error:function(a,c,b){}});