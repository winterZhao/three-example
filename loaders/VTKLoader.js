/**
 * @author mrdoob / http://mrdoob.com/
 * 取自 http://www.hewebgl.com/article/articledir/1
 * 如无法使用需要对应的three.js版本;
 */

THREE.VTKLoader = function (manager) {
  this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
	THREE.EventDispatcher.call( this );

};

THREE.VTKLoader.prototype = {

	constructor: THREE.VTKLoader,

	load: function ( url ) {
    var scope = this;
    var loader = new THREE.FileLoader(scope.manager);
		loader.load( url, function ( text ) {
			var geometry = scope.parse( text );
			if ( callback ) callback( geometry );

		});

	
	},

	parse: function ( data ) {
    console.log(data)
    console.log('12')
		var geometry = new THREE.Geometry();

		function vertex( x, y, z ) {

			geometry.vertices.push( new THREE.Vector3( x, y, z ) );

		}

		function face3( a, b, c ) {

			geometry.faces.push( new THREE.Face3( a, b, c ) );

		}

		function face4( a, b, c, d ) {

			geometry.faces.push( new THREE.Face4( a, b, c, d ) );

		}

		var pattern, result;

		// float float float

		pattern = /([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)/g;

		while ( ( result = pattern.exec( data ) ) != null ) {

			// ["1.0 2.0 3.0", "1.0", "2.0", "3.0"]

			vertex( parseFloat( result[ 1 ] ), parseFloat( result[ 2 ] ), parseFloat( result[ 3 ] ) );

		}

		// 3 int int int

		pattern = /3[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;

		while ( ( result = pattern.exec( data ) ) != null ) {

			// ["3 1 2 3", "1", "2", "3"]

			face3( parseInt( result[ 1 ] ), parseInt( result[ 2 ] ), parseInt( result[ 3 ] ) );

		}

		// 4 int int int int

		pattern = /4[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;

		while ( ( result = pattern.exec( data ) ) != null ) {

			// ["4 1 2 3 4", "1", "2", "3", "4"]

			face4( parseInt( result[ 1 ] ), parseInt( result[ 2 ] ), parseInt( result[ 3 ] ), parseInt( result[ 4 ] ) );

		}
    console.log(geometry)
		geometry.computeCentroids();
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		geometry.computeBoundingSphere();

		return geometry;

	}

}
