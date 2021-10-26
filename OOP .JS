class User {
  function __construct($name) {
   private $name;
   private $loggedIn;
   private $lastLoggedInAt;

   $this->name = $name;
   $this->loggedIn = false;
   $this->lastLoggedInAt = null;
  }
  function isLoggedIn() {
    return $this->loggedIn;
  }
  function getLastLoggedInAt() {
    return $this->lastLoggedInAt;
  }
  function logIn() {
    $this->lastLoggedInAt = new Date('Y-m-d H:i:s');
    $this->loggedIn = true;
  }
  function logOut() {
    $this->loggedIn = false;
  }
  function getName() {
    return $this->name;
  }
  function setName($name) {
    $this->name = $name;
  }
  function canEdit($comment) {
    if($comment->author->name === $this->name) {
      return true;
    }
    return false;
  }
  function canDelete($comment) {
    return false;
  }
}

class Moderator extends User {
   function __construct($name) {
     $this->name = $name;
   }
   function canDelete($comment) {
     return true;
   }
}

class Admin extends Moderator {
  function constructor($name) {
    $this->name = $name;
  }
  function canEdit($comment) {
    return true;
  }
}

class Comment {
   function __construct($author = null, $message, $repliedTo = null) {

    private $createdAt;
    private $message;
    private $repliedTo;
    private $author;

     $this->createdAt = new Date('Y-m-d H:i:s');
     $this->message = $message;
     $this->repliedTo = $repliedTo;
     $this->author = $author;
   }
   function getMessage() {
     return $this->message;
   }
   function setMessage($message) {
     $this->message = $message;
   }
   function getCreatedAt() {
     return $this->createdAt;
   }
   function getAuthor() {
     return $this->author;
   }
   function getRepliedTo() {
     return $this->repliedTo;
   }
   function __toString() {
     if($this->repliedTo === null) {
        return $this->message + " by " + $this->author->name;
     }
     return $this->message + " by " + $this->author->name + " (replied to " + 
          $this->repliedTo->author->name + ")";
   }
 }
