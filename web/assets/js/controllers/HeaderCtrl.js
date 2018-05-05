SondaggiIS.controller('HeaderCtrl', function($scope,$rootScope, $location,$routeParams, LoginService) {
  $scope.isLogged=false;
  $scope.nome='';

  if (LoginService.isLoggedIn()) {
    $scope.isLogged=true;
    $scope.nome=LoginService.getCurrentAccount().username;
  }
});
