<style>
</style>

<template>
  <div id="comment">
    <section id="isso-thread" :data-isso-id="uri"></section>
  </div>
</template>

<script>
export default {
  name: "comment",
  methods: {},
  props: {
    uri: String
  },
  watch: {
    commentElements(val) {
      if (val === 6) {
        try {
          var f = getElementById("isso-thread");
          for (var i = 3; i < 6; i++) {
            f.removeChild(childs[i]);
          }
        } catch {}
      }
    }
  },
  mounted() {
    // console.log(this.url);
    // document.onload = function() {
    const parent = document.getElementById("comment");
    if (parent.childElementCount === 1) {
      const script = document.createElement("script");
      script.setAttribute("data-isso", "http://db.baka.pw:8898/comment/");
      script.setAttribute("data-isso-id", "thread-id");
      script.setAttribute("data-isso-lang", this.$i18n.locale);
      script.setAttribute("data-isso-css", "true");
      script.setAttribute("data-isso-reply-to-self", "false");
      script.setAttribute("data-isso-require-author", "true");
      script.setAttribute("data-isso-require-email", "false");
      script.setAttribute("data-isso-max-comments-top", "10");
      script.setAttribute("data-isso-max-comments-nested", "2");
      script.setAttribute("data-isso-reveal-on-click", "5");
      script.setAttribute("data-isso-avatar", "true");
      // script.setAttribute("data-isso-bg", "true");
      // script.setAttribute("data-isso-fg", "true");
      script.setAttribute("data-vote", "true");
      script.setAttribute("data-isso-vote-levels", "");
      script.setAttribute("data-isso-feed", "false");
      script.setAttribute(
        "src",
        "http://db.baka.pw:8898/comment/js/embed.min.js"
      );
      this.$nextTick(() => {
        parent.appendChild(script);
      });
    }
    // };
  }
};
</script>
