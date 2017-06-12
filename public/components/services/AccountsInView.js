
app.service('$InView', function() {

	var self = this;
  	self.Accounts = [];

	self.GetAccounts = function(){
		return self.Accounts;
	}

	self.AddAccount = function(account){
		//console.log('addAccount - AccountsInView factory');
		//console.log(account); 
		if( account.Name != undefined && account.Name != null && account.Id != undefined && account.Id != null &&  self.ContainsAccount(account) == false)
		  self.Accounts.push(account);
		else{
		  console.log('this account was not added to AccountsInView');
		  console.log(account);
		}

	}

	self.ContainsAccount = function(account){
	for(var i = 0; i < self.Accounts.length; i++)
	  if( account.Id.substring(0, 15) == self.Accounts[i].Id.substring(0, 15) )
	    return true;

	return false;
	}

});
