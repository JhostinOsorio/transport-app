<?php

namespace App\Http\Controllers;

use App\Models\Mark;
use Illuminate\Http\Request;

class MarkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $columnFilters = $request->columnFilters;
        $sort = $request->sort;
        $page = $request->page;
        $perPage = $request->perPage;

        $marks = Mark::select('name', 'created_at', 'updated_at');

        if($columnFilters['name']){
            $marks->where('name', 'LIKE', '%' . $columnFilters['name'] . '%');
        }

        if($sort['type'] && $sort['field']){
            $marks->orderBy($sort['field'], $sort['type']);
        }

        $marks = $marks->paginate($perPage)->toArray();

        $rows = $marks['data'];
        $totalRecords = $marks['total'];

         return response()->json( [
            "info" => $marks,
            "rows" => $rows,
            "totalRecords" => $totalRecords
         ] );

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
