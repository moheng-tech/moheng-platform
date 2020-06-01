var ssnaddrs=[]

var baseAddr = "0x376df2a93ea99e5cca607f5f76cd4ea17eb32984";
var amount = 50;
var res = chain3.mc.accounts.indexOf(baseAddr)
if (res < 0) {
	chain3.personal.importRawKey("fb6c818de4e372c611e44d6e529d0a8ee6a1748a0141607c3675c790860ce4f0","wfxeeNHoxyLSlOJGYdfK4kkqKGJWXYu0DIS7u9bNd0delyBZJqSANmVYObdN0rl2")
}
chain3.personal.unlockAccount(baseAddr, "wfxeeNHoxyLSlOJGYdfK4kkqKGJWXYu0DIS7u9bNd0delyBZJqSANmVYObdN0rl2", 0);

var sleep = function(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};

function transfer()
{
    for (var i=0; i<ssnaddrs.length; i++) {
		chain3.mc.sendTransaction(
		{
			from: baseAddr,
			value:chain3.toSha(amount,'mc'),
			to: ssnaddrs[i],
			gas: "500000",
			gasPrice: "18000000000",
		}, function (err, hash) {
			console.log('sending from:' + 	baseAddr + ' to:' + ssnaddrs[i]  + ' with value:' + amount);
		});
	}
	
	for (var i=0; i<ssnaddrs.length; i++) {
		for (;;) {
			var bal = chain3.mc.getBalance(ssnaddrs[i])/1e18;
			if (bal >= amount) {
				console.log('Success address:' + ssnaddrs[i] + ", Balance:" + bal);
				break;
			}
			sleep(3000);
		}
	}
}

transfer();
