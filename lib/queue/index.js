/*
 * Queue
 */

var Queue = function() {
  this.queue = [];
  this.index = 0;  
}


/*
 * @api private
 */

Queue.prototype.__processQueue = function() {
  var self = this;
  if (this.queue[this.index]) {
    this.queue[this.index](function(error){
      if (error) return self.err(error);
      self.index++;
      self.__processQueue();
    });
  } else {
    this.done();
  }
}


/*
 * @api public
 */

Queue.prototype.add = function(fn) {
  this.queue.push(fn);
  
  return this;
}


Queue.prototype.start = function(done, err) {
  this.done = done;
  this.err = err;
  
  this.__processQueue();
}


Queue.prototype.err = function(error) {
  throw new Error(error);
}


/*
 * Expose Queue
 */

exports = module.exports = Queue;