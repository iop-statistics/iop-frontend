<style scoped>
.link a {
  font-size: 1rem;
}
@media (min-width: 768px) {
  .modal-dialog {
    max-width: 600px;
    margin: 30px auto;
  }
}
</style>

<template>
  <div>
    <div class="container">
      <h5>LINKS</h5>
      <div class="links">
        <a href="https://wiki.gamerclub.jp/dfwiki/index.php" class="ng-binding">ドルフロwiki</a>
        <br />
        <a href="http://bbs.ngacn.cc/thread.php?fid=-547859" class="ng-binding">NGA论坛-16LAB研究院</a>
      </div>
      <hr />
      <!-- Button trigger modal -->
      <a href="javascript:void(0);" data-toggle="modal" data-target="#modelId">关于本站</a>
      <!--type="button" class="btn btn-primary btn-lg" -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="modelId"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">About</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>{{$t('home.conditions')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageFooter"
};
</script>