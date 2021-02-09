<template>
  <div class="users-items">
    <div class="user-item">
      <div class="user-avatar">
        <picture class="user-picture">
          <img :src="avatar" :alt="firstName + ' ' + lastName" />
        </picture>
      </div>
      <div class="user-firstName">
        <h6>
          {{ firstName }}
        </h6>
      </div>
      <div class="user-lastName">
        <h6>
          {{ lastName }}
        </h6>
      </div>
      <div class="user-title">
        <h6>
          {{ title }}
        </h6>
      </div>
      <div class="user-year">
        <h6>
          {{ year }}
        </h6>
      </div>
      <div class="user-phone">
        <h6>
          {{ phone }}
        </h6>
      </div>
      <div class="user-email">
        <h6>
          {{ email }}
        </h6>
      </div>
      <div class="user-bio">
        <h6>
          {{ bio }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // computed: {
  //   users() {
  //     return this.$store.state.users;
  //   }
  // }
  props: ['avatar', 'firstName', 'lastName', 'email', 'title', 'year', 'phone', 'bio']
};
</script>

<style lang="scss">
.user {
  &-item {
    // border: 1px solid #1976d2;
    display: flex;
    padding: 10px 15px;
    margin: 10px;
    align-items: center;
    border-radius: 20px;
    background: #f5f5f5;
    justify-content: space-between;
    div {
      flex: 1;
    }
  }
  &-picture {
    display: flex;
    max-width: 100px;
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
  }
  &-bio {
    h6 {
      max-width: 400px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
