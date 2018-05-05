SondaggiIS.controller('ViewSondaggioCtrl', function($scope, $location,$routeParams, LoginService, SondaggiService) {

  if (!LoginService.isLoggedIn()) $location.path('/login');

  var sondaggioID=$routeParams.id;
  $scope.sondaggio={};
  $scope.formData={};

  if (LoginService.isAC()) $scope.canEdit=false;
  if (LoginService.isUtente()) {
    //TODO: da aggiungere che se ha già compilato il sondaggio, può vedere che risposte ha dato
    $scope.canEdit=true;
  }

  SondaggiService.getSondaggio(sondaggioID).then(function(resp) {
    $scope.sondaggio=resp.data;
  }).catch(function(err) {
    $location.path('/error');
  });

  $scope.submit=function() {
    SondaggiService.sendRisposte(sondaggioID,$scope.formData).then(function(resp) {
      $location.path('/sondaggi');
    }).catch(function(err) {
      $location.path('/error');
    });
  }

});
