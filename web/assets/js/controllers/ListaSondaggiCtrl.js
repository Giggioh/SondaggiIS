SondaggiIS.controller('ListaSondaggiCtrl', function($scope, $location, LoginService, SondaggiService) {

  if (!LoginService.isLoggedIn()) $location.path('/login');

  $scope.sondaggi=[];
  $scope.showModifica=false;
  $scope.showPubblica=false;
  $scope.showChiudi=false;

  if (LoginService.isUtente()) {
    SondaggiService.getSondaggiUtente(null).then(function (resp) {
      $scope.sondaggi = resp.data;
    }).catch(function (err) {
      $location.path('/error');
    });
  } else if (LoginService.isAC()) {
    $scope.showModifica=true;
    $scope.showPubblica=true;
    $scope.showChiudi=true;
    SondaggiService.getSondaggiAC(null).then(function (resp) {
      $scope.sondaggi = resp.data;
    }).catch(function (err) {
      $location.path('/error');
    });
  }

  $scope.compila=function(sondaggio) {
    $location.path("/sondaggio/"+sondaggio.id);
  }
  $scope.modifica=function(sondaggio) {
    $location.path("/edit/"+sondaggio.id);
  }
  $scope.pubblica=function(sondaggio) {
    SondaggiService.pubblica(sondaggio.id).then(function (resp) { //TODO: success stuff
      $location.path('/sondaggio/'+sondaggio.id);
    }).catch(function (err) {
      $location.path('/error');
    });
  }
  $scope.chiudi=function(sondaggio) {
    SondaggiService.chiudi(sondaggio.id).then(function (resp) {
    }).catch(function (err) {
      $location.path('/error');
    });
  }

});
