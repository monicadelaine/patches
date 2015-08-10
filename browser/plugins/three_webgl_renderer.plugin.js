(function() {
	var ThreeWebGLRendererPlugin = E2.plugins.three_webgl_renderer = function(core) {
		this.desc = 'THREE.js WebGL renderer'
		
		this.input_slots = [
			{
				name: 'camera',
				dt: core.datatypes.CAMERA,
				desc: 'Camera to use for rendering.'
			},
			{
				name: 'scene',
				dt: core.datatypes.SCENE,
				desc: 'Scene to render',
				def: null
			},
			{
				name: 'bgcolor',
				dt: core.datatypes.FLOAT,
				desc: 'Background color',
				def: null
			},
	/*
			{ name: 'mesh', dt: core.datatypes.MESH, desc: 'The input mesh to be rendered.', def: null },
			{ name: 'shader', dt: core.datatypes.SHADER, desc: 'Connect to this slot to use the supplied shader in favor of the one specified by the mesh (if any).', def: null },
			{ name: 'camera', dt: core.datatypes.CAMERA, desc: 'Camera to use for rendering.', def: core.renderer.camera_screenspace },
			{ name: 'transform', dt: core.datatypes.MATRIX, desc: 'Mesh transform.', def: core.renderer.matrix_identity }
	*/
		]

		this.output_slots = []

		this.always_update = true
		this.state = { always_update: true }
	}

	ThreeWebGLRendererPlugin.prototype.reset = function() {
		this.domElement = E2.dom.webgl_canvas[0]
		console.log('reset', this.$el, this.domElement.clientWidth / this.domElement.clientHeight)
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(
			75,
			this.domElement.clientWidth / this.domElement.clientHeight,
			0.1,
			1000)
	}

	ThreeWebGLRendererPlugin.prototype.update_input = function(slot, data) {
		switch(slot.index) {
			case 0:
				this.camera = data
				break;
			case 1:
				this.scene = data
				break;
			case 2:
				this.renderer.setClearColor(data)
				break;
		}
	}

	ThreeWebGLRendererPlugin.prototype.update_state = function() {
		this.renderer.render(this.scene, this.camera)
	}

	ThreeWebGLRendererPlugin.prototype.state_changed = function(ui) {
		if (!ui) {
			console.log('state_changed')
			this.domElement = E2.dom.webgl_canvas[0]
			this.renderer = new THREE.WebGLRenderer({
				canvas: this.domElement
			})
		}
	}

})()
