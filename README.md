# RandomOracle
The Oracle for randomness

Generators generate a single number from a specific source.
Methods manipulate that number
Structures represent the numbers, in a data format. This can be as a single number, sequence of numbers, or specific data structure.
Note that these parameters are sent as a json Body in the HTTP(S) calls.
Without this it's not going to do anything

All values until it hits structures are normalized
In structure settings you specify how you want the data to be specified

A POST Call can have the following body params:
generator:           specify generator
generator_settings:  specific generator config
method:              specify manipulator
method_settings:     specify manipulator settings
structure:           specify structure
structure_settings:  specific structure settings

Example call:

{
  "generator":"weather",
  "generator_settings":{},
  "method":"none",
  "method_settings": {},
  "structure":"set",
  "structure_settings": {"amount":12, "min":0, "max":10}
  }

OR

{
  "generator":"pseudo",
  "generator_settings":{},
  "method":"gaussian",
  "method_settings": {"mean":0.5, "standard_deviation":0.05},
  "structure":"2d-set",
  "structure_settings": {"amount":940, "minX":0, "maxX":100, "minY":0, "maxY":100}
}
