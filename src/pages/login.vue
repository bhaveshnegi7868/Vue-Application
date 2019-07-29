<template>
  <div class="fixed-center text-center">
    <form action="action_page.php">
      <div class="container">
        <div class="row q-my-md">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required>
        </div>
        <div class="row q-my-md">
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required>
        </div>
        <div class="row q-my-md">
        <button type="submit">Login</button>
        <label>
          <input type="checkbox" checked="checked" name="remember"> Remember me
        </label>
        </div>
      </div>
      <div class="container" style="background-color:#f1f1f1">
        <button type="button" class="cancelbtn">Cancel</button>
        <span class="psw">Forgot <a href="#">password?</a></span>
      </div>
   </form>
  </div>
</template>

<script>
</script>
