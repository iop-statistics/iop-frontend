<style scoped>
.link a {
  font-size: 1rem;
}

.grey {
  font-size: 12px;
  color: #999;
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
      <div class="row justify-content-between">
        <div>
          <a href="javascript:void(0);" data-toggle="modal" data-target="#modelId">关于本站</a>
        </div>
        <div>
          <p class="m-0 grey">Powered by GFDB</p>
          <p class="m-0 grey">只做了一点微小的工作</p>
        </div>
      </div>
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
              <div>
                <p>Data collected by GFDB.</p>
                <br />
                <p>Server and database by: Lyt99</p>
                <p>Webpage and UI by: c丶cu, windamin</p>
                <p>English version by : Pianoforte</p>
                <p>Korean version by : SooMAE, BlumeX Anon</p>
                <p>
                  Japanese version by :
                  <a
                    href="https://wiki.gamerclub.jp/dfwiki/index.php"
                    class="ng-binding"
                  >DFwiki&amp;Gamerclub.jp</a>
                </p>
                <br />
              </div>
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