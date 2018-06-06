module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "version": {
      "type": "string",
      "required": false,
      "message": "Project version",
      "default": '1.0.0'
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    }
  },
  "skipInterpolation": "src/**/*.vue",
}
