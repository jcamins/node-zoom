extern "C"{
	#include <yaz/zoom.h>
}
#include <node.h>
#include <string>
#include "connection.h"
#include "record.h"
#include "resultset.h"

using namespace v8;

RecordObject::RecordObject(){};
RecordObject::~RecordObject(){};

Persistent<Function> RecordObject::constructor;

void RecordObject::Init(){
	Local<FunctionTemplate> tpl = FunctionTemplate::New(New);
	tpl->SetClassName(String::NewSymbol("ResultSet"));
	tpl->InstanceTemplate()->SetInternalFieldCount(1);

	// Prototype
	tpl->PrototypeTemplate()->Set(String::NewSymbol("render"), 
			FunctionTemplate::New(render)->GetFunction());
	
	tpl->PrototypeTemplate()->Set(String::NewSymbol("rawdata"), 
			FunctionTemplate::New(rawdata)->GetFunction());
	
	tpl->PrototypeTemplate()->Set(String::NewSymbol("xml"), 
			FunctionTemplate::New(xml)->GetFunction());
	
	tpl->PrototypeTemplate()->Set(String::NewSymbol("recsyn"), 
			FunctionTemplate::New(recsyn)->GetFunction());
	
	constructor = Persistent<Function>::New(tpl->GetFunction());
}

Handle<Value> RecordObject::New(const Arguments& args){
	HandleScope scope;
	RecordObject * rs = new RecordObject();
	rs->Wrap(args.This());
	return args.This();
}

Handle<Value> RecordObject::NewInstance(ResultSetObject * res, int index){
	HandleScope scope;
	
	Local<Object> instance = constructor->NewInstance();

	RecordObject * obj = node::ObjectWrap::Unwrap<RecordObject>(instance);
	
  obj->r = ZOOM_resultset_record(res->rs, index);

  if (obj->r) {
    return scope.Close(instance);
  }

  return scope.Close(Null());
}

Handle<Value> RecordObject::NewInstance(){
	HandleScope scope;
	
	Local<Object> instance = constructor->NewInstance();
	
	return scope.Close(instance);
}

Handle<Value> RecordObject::render(const Arguments& args){
	HandleScope scope;
	int len;
	RecordObject * obj = node::ObjectWrap::Unwrap<RecordObject>(args.This());
	const char* data = ZOOM_record_get(obj->r, "render", &len);
	return scope.Close(String::New(std::string(data, len).c_str()));
}

Handle<Value> RecordObject::rawdata(const Arguments& args){
	HandleScope scope;
  int len;
	RecordObject * obj = node::ObjectWrap::Unwrap<RecordObject>(args.This());
  const char* data = ZOOM_record_get(obj->r, "raw", &len);
	return scope.Close(String::New(std::string(data, len).c_str()));
}

Handle<Value> RecordObject::xml(const Arguments& args){
	HandleScope scope;
  int len;
	RecordObject * obj = node::ObjectWrap::Unwrap<RecordObject>(args.This());
  const char *data = ZOOM_record_get(obj->r, "xml", &len);
	return scope.Close(String::New(data));
}

Handle<Value> RecordObject::recsyn(const Arguments& args){
	HandleScope scope;
	RecordObject * obj = node::ObjectWrap::Unwrap<RecordObject>(args.This());
  const char *syn = ZOOM_record_get(obj->r, "syntax", 0);
	return scope.Close(String::New(syn));
}
