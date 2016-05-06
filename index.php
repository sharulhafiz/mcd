<head>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

  <!-- Optional theme -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
  <style type="text/css">
    li {list-style-type:none;}
  </style>
  <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
  <script src="similarity.js"></script>
  <script src="script.js"></script>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-xs-6 col-xs-offset-3 bg-info" style="">
                <h4>Requirement Document Generator Using XML Schemas</h4>
                <form action="output.php">
                  <div class="form-group">
                    <label for="exampleInputFile">Insert Original XML Schema (must be in *.txt)</label>
                    <input type="file" id="exampleInputFile">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputFile">Insert XML Schema's version (must be in *.txt)</label>
                    <input type="file" id="exampleInputFile">
                  </div>
                  <div class="text-center">
                      <button type="submit" class="btn btn-info">Generate</button>
                  </div>
                </form>
            </div>
            <div class="col-xs-6 col-xs-offset-3 bg-info" style="">
              <ol class="main"></ol>            
            </div>
        </div>
    </div>

</body>
