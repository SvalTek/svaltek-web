<template>
  <main>
    <p>Hello World</p>
    <LuaScript>
      print("Hello, World")
    </LuaScript>

    <p>Lots of hello World</p>
    <LuaScript>
      for i=1,10 do
        print(string.format("Hello, World %d",i))
      end
    </LuaScript>


    some other random text
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LuaTest'
})
</script>
