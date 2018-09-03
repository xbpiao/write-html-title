# 修改HTML中的<title></title>内容

## 用法

### 1. 安全到全局环境中

```
npm install -g write-html-title
```

### 2. 使用

```
write-html-title -f ./index.html -t mytitle
```

写入后
```
<!DOCTYPE html>
<html><head>
    <meta charset="utf-8">
    <title>mytitle</title>
</head>
<body>
<h1>HelloWorld</h1>

</body></html>
```