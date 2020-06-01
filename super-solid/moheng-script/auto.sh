#设置super-solid-node的文件路径
path=~/bls
#设置重定向日志的路径与文件名
logpath=~/log/superlog
ps -ef|grep './super-solid-node --rpc --rpcaddr 0.0.0.0 --rpcport 8646 --p2pport 30383'| awk '{print "kill -9 "$2}'|sh
cd $path;nohup ./super-solid-node --rpc --rpcaddr 0.0.0.0 --rpcport 8646 --p2pport 30383 > $logpath 2>&1 &
