<template>
  <main>
    <b-row class="content justify-content-center">
      <div :id="`luacode-container-${GetScriptId}`" class="luacode-container">
        <b-row class="luacode-content slide-up-fade-in">
          <b-col class="col-lg">
            <div class="luacode-block">
              <div class="scroller text-left">
                <pre>
        		      <code :id="`luacode-content-${GetScriptId}`" v-highlight class="lua">
                    <slot></slot>
                  </code>
      		      </pre>
              </div>
              <b-button class="luacode-run" @click="runLua()"
                >Run Code</b-button
              >
            </div>
          </b-col>
        </b-row>
        <b-row class="justify-content-center slide-down-fade-in">
          <b-col class="col-lg">
            <div
              :id="`luacode-output-${GetScriptId}`"
              class="luacode-output luacode-output-hidden"
            >
              <b-textarea
                v-model="LuaOutput"
                :readonly="true"
                :rows="LuaOutputHeight"
              />
            </div>
          </b-col>
        </b-row>
      </div>
    </b-row>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import * as fengari from '../../static/scripts/fengari-web'
import { randomString } from '../../static/scripts/utils'

export default Vue.extend({
  name: 'LuaScript',
  components: {},
  props: {
    LuaScriptId: {
      type: String
    }
  },
  data() {
    return {
      LuaOutput: 'No Data',
      LuaOutputHeight: 0
    }
  },
  computed: {
    LuaScript(): string {
      const LuaCodeElement = document.getElementById(
        'luacode-content-' + this.GetScriptId
      )
      const code = LuaCodeElement?.textContent
      return code || ''
    },
    GetScriptId(): string {
      return this.LuaScriptId || randomString(5)
    }
  },
  mounted() {},
  methods: {
    runLua(): void {
      const lua_code = this.LuaScript
      const code = `
      local _print_result = {}
      local oldprint = print
      local function print(...)
        oldprint(...)
        local line = table.concat({...},"   ")
        table.insert(_print_result,line)
      end
      
      do
        ${lua_code}
      end
      local resultStr = table.concat(_print_result,"\\n")
      return resultStr
      `
      console.log('Running Lua Code:', code)
      const result = fengari.load(code)()
      this.LuaOutputHeight = (result.match(/\n/g) || []).length + 1
      this.LuaOutput = result
      const LuaOutputElement = document.getElementById(
        'luacode-output-' + this.GetScriptId
      )
      if (LuaOutputElement) {
        LuaOutputElement.classList.replace(
          'luacode-output-hidden',
          'luacode-output-visible'
        )
      }
    }
  }
})
</script>

<style lang="scss">
.luacode-container {
  min-width: 400px;
  max-width: 600px;
}

.luacode-block {
  min-width: 400px;
  min-height: 20px;
  border-radius: 3px;
  background: #21252b !important;
  overflow: hidden;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.4);
  transition: all 0.5s ease-in-out;
  font-variant-ligatures: normal;

  code[class*='language-'] {
    color: rgb(178, 190, 190);
    text-shadow: none;
  }

  span[class='hljs-built_in'] {
    color: #d4614e;
  }

  span[class='hljs-number'] {
    color: #53aca0;
  }

  span[class='hljs-string'] {
    color: #89c361;
  }

  span[class='hljs-quote'] {
    color: darkgrey;
  }

  .luacode-run {
    float: right;
    margin-right: 3px;
    margin-bottom: 3px;
  }
}

.luacode-output {
  width: 400px;
  height: auto;
}

.luacode-output-hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 2s, opacity 2s linear;
}

.luacode-output-visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 1s linear;
}
</style>
