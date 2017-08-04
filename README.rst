netjson-editor.js
=================

.. image:: https://travis-ci.org/openwisp/netjsonconfig-editor.js.svg?branch=master
    :target: https://travis-ci.org/openwisp/netjsonconfig-editor.js

.. contents:: Table of Contents

description to be added

Project Goals
-------------

TODO

Installation
------------

TODO

Usage
-----

To use the editor, include the editor within the view and create a new instance as follows:

.. code:: javascript

    var editor = new netjsonEditor(options);

The various options available for the editor are as below. Default values will be used for any
option which is not provided.

1. **target**: target html element where the editor content will be
   stored. It should be an html input element like
   ``<input type="text" />`` or ``<textarea></textarea>``. *Default*:
   ``#netjsonconfig-area``
2. **schema**: This option receives the schema to be use to validate the
   content of the editor against. This should be a schema.org valid json
   schema. *Default*: ``{}``
3. **data**: The initial content to be populated within the editor on
   initialisation. This option receives a valid json object as
   parameter. *Default*: ``{}``
4. **helpText**: This option is used to set the default help text to
   be diaplayed at the top center of both the advanced editor and the
   basic editor. *Default*:
   ``Want learn to use the advanced mode? Consult the  <a href="http://netjsonconfig.openwisp.org/en/stable/general/basics.html" target="_blank">netjsonconfig documentation </a>.``
5. **validate**: This is a boolean value. if true the data within the
   editor will be validated against the schema else it will not be
   validated. *Defualt*: true
6. **onChange**: this is a callback reference. This is called when the
   content of the editor is changed. it is triggered wen the user edits
   the netjsonconfigs. *Default*: ``null``
7. **jsonError**: String error message to be displayed when the json
   within the editor is invalid and the user tries to exit the editor.
   *Default*: ``"Json entered is invalid"``

API
---

The NetjsonConfig Editor is initialised as follows:

.. code:: javascript

    var editor = new netjsonEditor(opts);

This returns a netjsonconfig editor object which could be used to manipulate and control the editor.

Instance Properties
~~~~~~~~~~~~~~~~~~~

- ``targetElement``:  Reference to the target element specified when initialising the editor
- ``props``: object containing all options used to initialise the the editor
- ``container``: reference to the container of the editor within the dom
- ``schema``: The current schema being used within the editor.
- ``text``: Returns the data currently being edited within the editor as a json string
- ``json``: Returns the data currently being edited within the editor as a json object

Instance Methods
~~~~~~~~~~~~~~~~

``changeSchema()``
##################

- **params**: ``schema`` - ``object`` of new schema
- **returns**: ``null``
- **description**: changes the schema being used by the editor and uses the new ``schema``
  passed to this method

``setJson()``
#############

- **params**: ``json`` - ``object`` to be used as data in the editor
- **return**: ``null``
- **description**: changes the data in the editor and uses a new ``json`` object as the data

``showBasicEditor()``
#####################

- **params**: ``null``
- **return**: ``null``
- **description**: brings the basic editor to focus

``showAdvancedEditor()``
#####################

- **params**: ``null``
- **return**: ``null``
- **description**: brings the advanced json editor to focus

``validate()``
#####################

- **params**: ``null``
- **return**: ``state`` ``boolean``
- **description**: checks whether data in the editor is valid against schema or not

``on()``
########

- **params**: ``event`` - ``string`` name of event to listen to, ``callback`` - ``func`` reference of function to be called when the event occurs
- **description**: Use the ``on`` method of the editor to hook in functions to be called when certain events occur

``off()``
#########

- **params**: ``null``
- **description**: Use the ``off`` method of the editor to clear any listeners to any events set previously
- ``events``: Some of the events currently being emmitted are:

  1. **change**: emmitted when data within the editor changes.

``destroy()``
#############

- **params**: ``null``
- **description**: This method can be used to destroy the editor and free up resources allocated.

Contributing
------------

First off, thanks for taking the time to read these guidelines.

Trying to follow these guidelines is important in order to minimize waste and avoid misunderstandings.

1. Ensure your changes meet the `Project Goals`_
2. If you found a bug please send a failing test with a patch
3. If you want to add a new feature, announce your intentions in the
   `issue tracker <https://github.com/netjson/netjsonconfig-editor.js/issues>`_
4. Fork this repo and install it by following the instructions in `Development Setup`_
5. Follow the style convention in use (`Google JavaScript style guide (ES2015+ version)
   <https://google.github.io/styleguide/jsguide.html>`_)
6. Write code
7. Write tests for your code
8. Ensure all tests pass
9. Ensure test coverage does not decrease
10. Document your changes
11. Send pull request

Development Setup
~~~~~~~~~~~~~~~~~

To setup this project for development do the following

1. Fork the repository.
2. Clone the repository locally using ``git clone https://github.com/<your_fork>/netjsonconfig-editor.js.git``.
3. Enter the local project’s root folder ``cd netjsonconfig-editor.js``
4. Install javascript dependencies. run ``npm install``
5. You should be ready to go.
6. Run ``npm run dev`` to start the development server to view any of the
   examples
7. Run ``npm run build`` to build the library and ``npm run watch`` to
   watch files for changes.
8. Run ``npm run watch`` to run a watch server to instantly build the
   javascript on change of any files.

Tests
~~~~~

- In order to run tests for the code written run the command ``npm run test`` writing tests is
  an essential part of the project.

- Ensure to run a build before trying to run any tests. The tests will fail if you don't.

- All new features added to the editor need to be accompanied with appropriate tests, but also
  ensuring that tets written before do not fail.

- netjsonconfig-editor.js uses mocha js as the test framework, chaijs as the assertion library
  and phantomjs as the virtual DOM for command line tests To get started with

Changelog
---------

See `CHANGELOG <https://github.com/netjson/netjsonconfig-editor.js/blob/master/CHANGELOG.rst>`_.

License
-------

See `LICENSE <https://github.com/openwisp/netjsonconfig-editor.js/blob/master/LICENSE>`_.
