module Api
module V1
class RecordsController < ApplicationController
before_action :get_template
before_action :set_record, only: [:show, :update, :destroy]

          # GET /records
          def index
            @records = @template.posts

            render json: @records
          end

          # GET /records/1
          def show
            render json: @record
          end

          # POST /records
          def create
            @record = @template.records.build(record_params)

            if @record.save
              render json: @record, status: :created
            else
              render json: @record.errors, status: :unprocessable_entity
            end
          end

          # PATCH/PUT /records/1
          def update
            if @record.update(record_params)
              render json: @record
            else
              render json: @record.errors, status: :unprocessable_entity
            end
          end

          # DELETE /records/1
          def destroy
            @record.destroy
          end

          private
            # Use callbacks to share common setup or constraints between actions.
            def set_record
              @record = Record.find(params[:id])
            end
              def get_template
                @template = Template.find(params[:template_id])
              end
            # Only allow a trusted parameter "white list" through.
            def record_params
              params.require(:record).permit(:description, :time, :effect, :path, :template_id)
            end
        end
      end
    end
