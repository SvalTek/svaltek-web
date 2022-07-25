<!--
 Copyright (C) 2022 Theros [SvalTek|MisModding]

 This file is part of miscord-webservice.

 miscord-webservice is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 miscord-webservice is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with miscord-webservice.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <div id="status-bar" class="fixed-bottom bg-dark">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <!--- Left Side -->
            <div class="col-lg">
              <div class="row">
                <!--- Footer-Left-Content -->
                <div id="footer-left-content" class="col-lg-8">
                  <svg
                    class="bi bi-heart-fill"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="red"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: inline-block"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                  <span> {{ `${ProjectName} v:${ProjectVersion}` }} </span>
                  <br>
                  <span> {{ FooterText }} </span>
                </div>
                <!--- Footer-Center-Content -->
                <div id="footer-center-content" class="col-sm-4">
                  <!-- 2 lines of text -->
                  <div class="row">
                    <div class="col-md-6">
                      <a :href="ProjectRepository" target="_blank"> GitHub </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterSection',
  data() {
    return {}
  },
  computed: {
    ProjectName() {
      return this.$store.state.ProjectName
    },
    ProjectVersion() {
      return this.$store.state.ProjectVersion
    },
    ProjectRepository() {
      return this.$store.state.ProjectRepository
    },
    FooterText() {
      return this.$store.state.FooterText
    }
  }
}
</script>

<style scoped>
#status-bar {
  color: azure;
  max-height: 64px;
}
</style>