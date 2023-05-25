---
home: true
lang: "en-US"
heroText: Normal No More!
tagline: Welcome to zjw's Blog
# tagline: Welcome to zjw's friends circle
actionText: Fast Access →
actionLink: /guide/
features:
  - title: non-stop questions
    details: It is mainly to record the gains and feelings of some knowledge that I usually learn.
  - title: Study Notes
    details: Record the notes of the framework you have learned and some knowledge and tutorials commonly used in development, so that you can review it yourself.
  - title: About Me
    details: My name is XXXWeii, and I mainly use it for my own study and record the problems and solutions encountered in the study.
heroImage: /logo.jpg
heroImageStyle:
  {
    width:"250px",
    height:"200px",
    width: "100%",
    display: block,
    margin: "9rem auto 2rem",
    background: "#fff",
    borderRadius: "50%",
    -webkit-border-radius:"50%",
    -moz-border-radius:"50%",
  }
# bgImage: /tiyugongyuan.jpg
bgImageStyle: { height: "1000px" }
isShowTitleInHome: false
---

<Vssue :title="$title" />
<!-- <style>
/* body{
  background-image: url("/bg.gif");
}    */
.anchor-down {     
  display: block;     
  margin: 12rem auto 0;     
  bottom: 45px;     
  width: 20px;     
  height: 20px;     
  font-size: 34px;     
  text-align: center;     
  animation: bounce-in 5s 3s infinite;     
  position: absolute;     
  left: 50%;     
  bottom: 30%;     
  margin-left: -10px;     
  cursor: pointer;   
}   
@-webkit-keyframes bounce-in{     
  0%{transform:translateY(0)}     
  20%{transform:translateY(0)}     
  50%{transform:translateY(-20px)}     
  80%{transform:translateY(0)}     
  to{transform:translateY(0)}   
}   
.anchor-down::before {     
  content: "";     
  width: 20px;     
  height: 20px;     
  display: block;     
  border-right: 3px solid #fff;     
  border-top: 3px solid #fff;     
  transform: rotate(135deg);     
  position: absolute;     
  bottom: -110px;   
}   
.anchor-down::after {     
  content: "";     
  width: 20px;     
  height: 20px;     
  display: block;     
  border-right: 3px solid #fff;     
  border-top: 3px solid #fff;     
  transform: rotate(135deg); 
  position: absolute;    
  bottom: -120px; 
}   
</style>
<script>   
export default {     
  mounted () {       
    const ifJanchor = document.getElementById("JanchorDown");        
    ifJanchor && ifJanchor.parentNode.removeChild(ifJanchor);       
    let a = document.createElement('a');       
    a.id = 'JanchorDown';       
    a.className = 'anchor-down';       
    document.getElementsByClassName('hero')[0].append(a);       
    let targetA = document.getElementById("JanchorDown");       
    targetA.addEventListener('click', e => { 
      // 添加点击事件         
      this.scrollFn();       
    })     
  },        
  methods: {       
    scrollFn() {         
      const windowH = document.getElementsByClassName('hero')[0].clientHeight; // 获取窗口高度         
      document.documentElement.scrollTop = windowH; // 滚动条滚动到指定位置       
    }     
  }   
}   
</script> -->
