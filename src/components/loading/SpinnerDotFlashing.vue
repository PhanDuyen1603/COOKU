<template>
  <div>
    <div class="stage">
      <div class="dot-flashing"></div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color:  var(--clr-gray);
  color:  var(--clr-gray);
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: .5s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--clr-black);
  color: var(--clr-black);
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--clr-black);
  color: var(--clr-black);
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dotFlashing {
  0% {
    background-color: var(--clr-black);
  }

  50%,
  100% {
    background-color: var(--clr-gray);
  }
}
</style>