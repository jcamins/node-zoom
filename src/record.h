#ifndef RECORD_H
#define RECORD_H

extern "C"{
	#include <yaz/zoom.h>
}
#include <node.h>
#include "resultset.h"

class RecordObject : public node::ObjectWrap {
	public:
		static void Init();
		static v8::Handle<v8::Value> NewInstance(ResultSetObject * res, int index);
		static v8::Handle<v8::Value> NewInstance();
		static v8::Handle<v8::Value> render(const v8::Arguments& args);
		static v8::Handle<v8::Value> rawdata(const v8::Arguments& args);
		static v8::Handle<v8::Value> xml(const v8::Arguments& args);
		static v8::Handle<v8::Value> txml(const v8::Arguments& args);
		static v8::Handle<v8::Value> recsyn(const v8::Arguments& args);
		static v8::Handle<v8::Value> schema(const v8::Arguments& args);
		ZOOM_record r;

	private:
		static v8::Handle<v8::Value> New(const v8::Arguments& args);
		static v8::Persistent<v8::Function> constructor;
		RecordObject();
		~RecordObject();

};

#endif
