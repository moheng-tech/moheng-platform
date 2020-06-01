# 导入Flask类
from flask import Flask
import psutil
# 实例化，可视为固定格式
app = Flask(__name__)

@app.route('/monitor')
def monitor():
    cpu=psutil.cpu_percent(interval=1)
    mem=psutil.virtual_memory()
    memtotal=bytes2human(mem.total)
    memused=bytes2human(mem.used)
    mempercent=mem.percent
    disk=[]
    for x in psutil.disk_partitions():
        b=psutil.disk_usage(x.mountpoint)
        disk.append({'diskusestr':bytes2human(b.used),'disktotalstr':bytes2human(b.total) ,'diskper':b.percent })
    print(disk)
    d = {'cpuuse': cpu, 'ramper':mempercent,'ramtotal': memtotal, 'ramuse': memused,'disk':disk}
    print(d)
    return d
def bytes2human(n):
     symbols = ('K','M','G','T','P','E','Z','Y')
     prefix = {}
     for i,s in enumerate(symbols):
         prefix[s] = 1 << (i + 1) * 10
     for s in reversed(symbols):
         if n >= prefix[s]:
             value = float(n) / prefix[s]
             return '%.1f%s' % (value,s)
     return '%sB' % n
print(bytes2human(psutil.virtual_memory().total))

if __name__ == '__main__':
    # app.run(host, port, debug, options)
    # 默认值：host="127.0.0.1", port=5000, debug=False
    app.run(host="0.0.0.0", port=5000)

