<template>
  <div>
    <div id="overlay">
      <div class="h-80 w-auto">
        <div class="pac-man" />
      </div>
    </div>
  </div>
</template>

<style scoped>
main {
  background: rgb(6, 17, 60, 0.7);
}

.pac-man {
  z-index: 1;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 5em;
  border-radius: 100em 100em 0 0;
  background: #f00;
  transform-origin: bottom;
  animation: eating-top 0.5s infinite;
}
.pac-man,
.pac-man::before {
  width: 180px;
  height: calc(90px);
  background: #f05e1c;
}
.pac-man::before {
  content: "";
  display: block;
  margin-top: calc(90px);
  position: absolute;
  transform-origin: top;
  border-radius: 0 0 100em 100em;
  transform: rotate(80deg);
  animation: eating-bottom 0.5s infinite;
}
.pac-man::after {
  position: absolute;
  border-radius: 100em;
  content: "";
  display: block;
  height: 20px;
  width: 20px;
  margin-top: calc(80px);
  margin-left: calc(80px);
  transform-origin: center;
  animation: center 0.5s infinite, ball 0.5s -0.33s infinite linear;
}
@keyframes eating-top {
  0% {
    transform: rotate(-40deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-40deg);
  }
}
@keyframes eating-bottom {
  0% {
    transform: rotate(80deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(80deg);
  }
}
@keyframes center {
  0% {
    transform: rotate(40deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(40deg);
  }
}
@keyframes ball {
  0% {
    opacity: 0.7;
    box-shadow: 70px 0 0 0 #f05e1c, 120px 0 0 0 #f05e1c, 170px 0 0 0 #f05e1c,
      220px 0 0 0 #f05e1c;
  }
  100% {
    box-shadow: 20px 0 0 0 #f05e1c, 70px 0 0 0 #f05e1c, 120px 0 0 0 #f05e1c,
      170px 0 0 0 #f05e1c;
  }
}

#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
